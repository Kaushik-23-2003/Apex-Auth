const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');
const { transporter } = require('../config/nodemailer');

// Function to fetch user details
const getUserDetails = async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid User ID' });
  }

  // Check if the user is authorized to update this profile
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    // Hash password if it's being updated
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Dynamically update the user fields (only updates fields provided in the request body)
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;
    res.cookie('token', req.cookies.token, { httpOnly: true }); // Refresh the token
    return res.status(200).json(rest);
  } catch (err) {
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Utility function to send email on user update
const sendUpdateEmail = async (email, username) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Your Account Details Have Been Updated",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center;">
          <h2 style="color: #007bff;">Your Apex Auth Account Updated</h2>
        </div>
        <p>Dear ${username},</p>
        <p>We are writing to inform you that your Apex Auth account details have been successfully updated.</p>
        <p>If you made these changes, you can disregard this email. If you did not authorize these changes, please contact our support team immediately to secure your account.</p>
        <p>For security reasons, we recommend you review your account information periodically.</p>
        <p>Thank you,<br/><strong>The Apex Auth Team</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">This email was sent to you to notify you about changes to your Apex Auth account. If you did not initiate an account update, please contact us immediately.</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

// Utility function to send email on user deletion
const sendDeleteEmail = async (email, username) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Your Account Has Been Deleted",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center;">
          <h2 style="color: #dc3545;">Apex Auth Account Deletion Notice</h2>
        </div>
        <p>Dear ${username},</p>
        <p>This is to confirm that your Apex Auth account has been successfully deleted from our system as per your request.</p>
        <p>Please note that this action is irreversible, and all data associated with your account will be permanently removed.</p>
        <p>If you did not request this account deletion, please contact our support team immediately.</p>
        <p>We appreciate you being a part of our community.</p>
        <p>Thank you,<br/><strong>The Apex Auth Team</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">This email was sent to you to confirm the deletion of your Apex Auth account. If you did not request account deletion, please contact us immediately.</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

// Function to update the user details
const updateUser = async (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  try {
    const updatedFields = { ...req.body };
    if (updatedFields.password && !req.user.isGoogleLogin) {
      updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...rest } = updatedUser._doc;
    res.cookie('token', req.cookies.token, { httpOnly: true });
    await sendUpdateEmail(updatedUser.email, updatedUser.username);
    return res.status(200).json(rest);
  } catch (err) {
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Function to delete the user details
const deleteUser = async (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findByIdAndDelete(req.params.id);
    await sendDeleteEmail(user.email, user.username);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { updateUser, deleteUser, getUserDetails };
