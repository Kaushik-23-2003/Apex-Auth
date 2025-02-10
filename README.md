# 🌟 Apex Auth: Secure Authentication Website - Your Foundation for Modern Web Security

![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-success?logo=web)](https://apex-auth-frontend.onrender.com/)

<p align="center">
  <img src="path/to/your/project-logo.png" alt="Project Logo" width="200">
</p>

<p align="center">
  ✨ <strong>Build secure web applications with confidence using Apex Auth - a meticulously crafted authentication system designed for modern web development, emphasizing security, user experience, and scalability.</strong> ✨
</p>

---

## 📝 Project Description 

Apex Auth is a modern authentication system designed for security, scalability, and ease of integration. It ensures robust user data protection with JWT authentication, Google OAuth, HTTP-only cookies, bcrypt password hashing, and email notifications.

Built with a decoupled architecture, it features a React frontend for an intuitive UI and a Node.js & Express backend with a secure RESTful API. Designed for customization and extensibility, it suits SaaS platforms, e-commerce sites, and applications requiring reliable user authentication.

With best-in-class security practices, Apex Auth enables developers to focus on building great applications without compromising authentication security. 🚀

---

## 🛠️ Tech Stack

Apex Auth is built with a carefully chosen tech stack to ensure performance, security, and maintainability.

### **Frontend - Crafting a Seamless User Experience**

-⚛️ **React** – Component-based UI for a dynamic and responsive user experience.
-🎨 **CSS Modules** – Scoped styling for modular and maintainable CSS.
-🚦 **Redux** – Centralized state management for efficient session handling.
-📡 **Fetch API** – Asynchronous HTTP requests for seamless frontend-backend communication.
-💬 **Toast Notifications** – User-friendly feedback for actions and errors.

### **Backend - The Secure and Scalable Engine**

-🚀 **Node.js + Express.js** – Fast, scalable REST API with an efficient event-driven architecture.
-💾 **MongoDB + Mongoose** – NoSQL database with flexible schema management.
-🔒 **JWT + Cookie-based Auth** – Secure authentication with stateless tokens and HTTP-only cookies.
-🔑 **bcryptjs** – Secure password hashing for data protection.
-📧 **Nodemailer** – Automated email notifications for user actions.
-🌐 **CORS** – Secure cross-origin request handling.
-⚙️ **dotenv** – Environment variable management for secure configurations.
---

## ✨ Key Features 

Apex Auth provides a secure, user-friendly, and developer-centric authentication experience with the following key features:

### 🔒 Secure Password Handling

- **User Registration with Robust Validation:**
    - **Comprehensive Registration Form:**  New users can easily create accounts by providing their **full name, a valid email address, and a secure password**. The registration process is designed to be intuitive and user-friendly.
        ```
        Screenshots/registration-form.png
        ```
        > *Example: A clean and accessible registration form prompting for essential user details.*

    - **Password Complexity Enforcement:**  Enforces strong password policies, requiring:
        - Minimum 8 characters
        - At least one uppercase letter
        - At least one number
        - At least one special symbol (e.g., !@#$%^&*)
    - **Real-time Validation:**  Provides immediate feedback if the password does not meet security criteria.
         ```
        Screenshots/password-complexity-validation.png
        ```
        > *Example: Error messages displayed when a user attempts to register with a weak password that doesn't meet complexity requirements.*

- **Google OAuth Login  (Streamlining User Access):**
    - **One-Click Google Sign-In:**  Enables users to log in with their Google account for a seamless authentication experience. Uses OAuth 2.0 for secure token-based session management, automatically creating or logging in users as needed.
        ```
        Screenshots/google-login-button.png
        ```
        > *Example: Prominent "Sign in with Google" button integrated into the login/signup page.*


### 📧 **User Engagement**

- **Welcome Emails**  
  Sends automated welcome emails to new users after successful registration, creating a personalized onboarding experience. These emails include the user's name and key platform highlights to encourage engagement.  

  ![Welcome Email Example](Screenshots/welcome-email-example.png)

- **Email Notifications for Account Updates (Optional)**  
  Can be extended to send notifications for critical account actions, such as:  
  - **Profile Updates:** Confirms successful changes to user information.  
  - **Account Deletion:** Sends a confirmation email when an account is deleted, ensuring transparency and security.  

  ![Profile Update Email](Screenshots/account-update-email.png)  
  ![Account Deletion Email](Screenshots/account-deletion-email.png)


-🔔 **Toast Notifications - Real-time User Feedback**  

  - **Non-Intrusive Feedback**  
    Provides real-time, non-intrusive toast notifications to inform users about important actions without disrupting their workflow.  
  
  - **Success and Error Notifications**  
    Displays toast messages for both success and error scenarios:  
    - **Success:** "Sign-in successful!" after login, "Profile updated successfully!" after a profile change.  
    - **Error:** "Invalid email or password." for login failures, "Passwords do not match." during registration.  
  
    ![Success Toast Notification](Screenshots/success-toast-notification.png)  
    ![Error Toast Notification](Screenshots/error-toast-notification.png)  


## 🛡️ Security Best Practices  

### 🔒 CSRF & XSS Protection  
- **HTTP-only Cookies (XSS Mitigation):** Prevents client-side JavaScript access, reducing the risk of session hijacking.  
- **`SameSite` Cookie Attribute (CSRF Mitigation):** Controls cookie behavior in cross-site requests, blocking unauthorized actions.  
- **Backend Input Sanitization:** Protects against SQL/NoSQL injection by validating and sanitizing user inputs.  

### 🔐 Secure Cookies (`HttpOnly`, `Secure`, `SameSite`)  
- **`HttpOnly`**: Blocks JavaScript access to cookies.  
- **`Secure`**: Ensures cookies are sent only over HTTPS.  
- **`SameSite`**: Configured as `'Lax'`, `'Strict'`, or `'None'` based on deployment needs.  

### 🌍 CORS Handling  
- **Cross-Origin Security**: Controls which domains can access the API.  
- **Backend Configuration**: Uses `cors` middleware with specific origins, methods, and headers.  
- **`credentials: true`**: Allows secure cross-origin authentication via cookies.  

---

## 👤 Profile Management  

### 📄 View & Update Profile  
- **View Profile:** Displays user details, including name, email, date of birth, gender, and address.  
  ![Profile View](Screenshots/view-profile-page.png)  
- **Edit Profile:** Enables users to update personal information.  
  ![Edit Profile](Screenshots/edit-profile-page.png)  

### 🗑️ Account Deletion  
- **User-Controlled Deletion:** Notifies and allows permanent account removal.  
  ![Delete Account](Screenshots/delete-account-confirmation.png)  

---

## 🚀 Modern Architecture  

### 🔗 Frontend & Backend Separation  
- **Scalable:** Allows independent scaling and updates.  
- **Maintainable:** Modular structure improves code organization.  

### 📡 RESTful API Communication  
- **Standardized HTTP Methods:** Uses GET, POST, PUT, DELETE for structured interactions.  
- **Stateless & Scalable:** Enhances performance and flexibility.  
- **Interoperable:** Supports multiple frontend technologies.  
  ![API Endpoints](Screenshots/restful-api-endpoints-example.png)  

### 🛠️ Scalable & Maintainable Codebase  
- **Modular Code:** Enhances reusability and maintainability.  
- **Error Handling & Logging:** Ensures reliability and easier debugging.  
- **Environment Variables (`dotenv`)**: Manages configurations securely.  

---

## 🌐 Live Demo  

🔗 **[Try Apex Auth](https://apex-auth-frontend.onrender.com/)**  

---

## 🚀 Installation & Setup

### ⚙️ Prerequisites  
- **Node.js (v18+)**: [Download](https://nodejs.org/)  
- **npm/yarn**: [Install Yarn](https://yarnpkg.com/getting-started/install)  
- **MongoDB (Local or Atlas)**: [Setup MongoDB](https://www.mongodb.com/docs/manual/installation/)  

### 🌐 Frontend Setup (React)

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Start the frontend server:**

    ```bash
    npm run start  # or yarn start
    ```

    > The frontend should now be accessible at `http://localhost:5173`.

### ⚙️ Backend Setup (Node.js & Express)

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Configure environment variables:**
    -   Create a `.env` file in the `backend` directory.
    -   Add the following variables, **replacing placeholders with your values**:

        ```env
        PORT=5000
        NODE_ENV=development
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        FRONTEND_URL=http://localhost:5173
        SENDER_EMAIL=YOUR_EMAIL@example.com        # Optional
        SENDER_EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD   # Optional
        ```

4.  **Start the backend server:**

    ```bash
    npm run dev  # or yarn dev
    ```

    > The backend should now be running at `http://localhost:5000`.

---

## 🛠 Development & Contribution

### 🤝 Contributing Guidelines

Join us in making Apex Auth even better!

1.  **Fork the repository** to your GitHub account.
2.  **Create a new branch** for your feature or fix:

    ```bash
    git checkout -b feature/new-feature
    ```

3.  **Make your changes** and commit them with descriptive messages:

    ```bash
    git commit -m "Add new feature: ..."
    ```

4.  **Push your branch** to your forked repository:

    ```bash
    git push origin feature/new-feature
    ```

5.  **Create a Pull Request** on GitHub – we'll review it promptly!

---

## 📞 Contact

👤 **Hariharan Kaushik** – Project Creator

📧 **Email:** kaushikhariharan2003@gmail.com

🌐 **Live Demo:** [Apex Auth](https://apex-auth-frontend.onrender.com/)
