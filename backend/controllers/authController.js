const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transporter } = require("../config/nodemailer");
const User  = require("../models/User");

// Utility to generate JWT token
const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// Utility to send a welcome email
const sendWelcomeEmail = async (email, username) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to Apex Auth!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center;">
          <h2 style="color: #4CAF50;">Welcome to Apex Auth!</h2>
        </div>
        <p>Dear ${username},</p>
        <p>Thank you for registering with us! We are thrilled to have you on board. Your account has been successfully created, and you are now a valued member of our community.</p>
        <p>Please feel free to explore our platform and make the most out of your experience.</p>
        <p>If you have any questions, do not hesitate to reach out to our support team.</p>
        <p>Thank you,<br/><strong>The Apex Auth Team</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">This email was sent to ${email}. If you did not register for an account, you can safely ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Validate password complexity
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

// Utility to set the authentication cookie
// const setAuthCookie = (res, tokenValue) => {
//   if (!tokenValue) {
//     console.error("Token value is missing!");
//     return res.status(500).json({ message: "Failed to set authentication cookie" });
//   }

//   res.cookie("token", tokenValue, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production', // Ensure HTTPS for production
//     sameSite: 'Strict', // Use 'None' for cross-origin requests in local dev
//     maxAge: 3600000, // Cookie expires in 1 hour
//   });
// };

// Utility to set the authentication cookie
const setAuthCookie = (res, tokenValue) => {
  if (!tokenValue) {
    console.error("Token value is missing!");
    return res.status(500).json({ message: "Failed to set authentication cookie" });
  }

  res.cookie("token", tokenValue, {
    httpOnly: true,
    secure: true, // Ensure cookies are sent over HTTPS
    sameSite: 'None', // Allow cross-site cookie usage (for Render, might be needed)
    domain: '.onrender.com', //  Explicitly set domain for Render
    path: '/', // Make cookie available for all paths on the domain
    maxAge: 3600000, // Cookie expires in 1 hour (adjust as needed)
  });
};


// Register user
const registerUser = async (req, res) => {
  let { fullname, email, password, confirmPassword } = req.body;

  // Manual validation
  if (!fullname || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Password criteria not met." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  email = email.toLowerCase();
  const username = fullname.split(" ")[0];

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePicture: "", 
      fullname,
      createdAt: Date.now(),
    });
    const token = generateToken(newUser);
    setAuthCookie(res, token);
    await sendWelcomeEmail(email, username);

    return res.status(201).json({
      user: {
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        _id: newUser._id,
        fullname: newUser.fullname,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

// Login user
// const loginUser = async (req, res) => {
//   let { email, password } = req.body;
//   email = email.toLowerCase();

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid credentials." });
//     }

//     const token = generateToken(user);
//     setAuthCookie(res, token);

//     return res.status(200).json({
//       user: {
//         username: user.username,
//         email: user.email,
//         profilePicture: user.profilePicture,
//         _id: user._id,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "An error occurred. Please try again later." });
//   }
// };

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user);
    console.log("Generated token:", token); // **ADD THIS LINE**
    console.log("Calling setAuthCookie..."); // **ADD THIS LINE**
    setAuthCookie(res, token);
    console.log("setAuthCookie called successfully (hopefully)"); // **ADD THIS LINE**

    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

// Google login
const google = async (req, res) => {
  const { email, name, photo } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      user = await User.create({
        username: name.split(" ")[0],
        email: email.toLowerCase(),
        password: hashedPassword,
        profilePicture: photo || "", 
        fullname: name,
      });

      await sendWelcomeEmail(email, user.username);
    }

    const token = generateToken(user);
    setAuthCookie(res, token);  // Make sure you're passing the token to set the cookie

    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during Google login." });
  }
};

// Logout user
const logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 }); // Set token cookie to expire immediately
  return res.status(200).json({ message: "Successfully logged out." });
};

module.exports = { registerUser, loginUser, google, logout };
