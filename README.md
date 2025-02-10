# 🌟 Apex Auth: Secure Authentication Website

[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)](https://github.com/your-github-username/your-repo-name)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-success?logo=web)](https://apex-auth-frontend.onrender.com/)

<p align="center">
  <img src="path/to/your/project-logo.png" alt="Project Logo" width="200">
</p>

<p align="center">
  ✨ <strong>Build secure web applications with confidence using Apex Auth - a meticulously crafted authentication system designed for modern web development, emphasizing security, user experience, and scalability.</strong> ✨
</p>

---

## 📝 Project Description

Apex Auth is a **modern authentication system** engineered for **security, scalability, and seamless integration**. It prioritizes robust user data protection through a comprehensive suite of features, including:

*   **JWT (JSON Web Token) Authentication:** For stateless and secure user verification.
*   **Google OAuth Integration:**  Offering users a streamlined login experience.
*   **HTTP-only Cookies:** Enhancing session security and mitigating XSS vulnerabilities.
*   **bcrypt Password Hashing:** Employing industry-standard password encryption for data integrity.
*   **Automated Email Notifications:** Keeping users informed about key account activities.

Leveraging a **decoupled architecture**, Apex Auth features a **dynamic React frontend** for an intuitive user interface and a **powerful Node.js & Express backend** providing a secure and scalable RESTful API. Designed for **customization and extensibility**, Apex Auth serves as an ideal foundation for various applications, from SaaS platforms to e-commerce sites, demanding reliable and robust user authentication.

Apex Auth empowers developers to concentrate on building exceptional applications without compromising on authentication security, thanks to its adherence to **best-in-class security practices**. 🚀

---

## 🛠️ Tech Stack

Apex Auth is constructed using a carefully curated technology stack, ensuring peak performance, robust security, and long-term maintainability.

### **Frontend - Crafting a Seamless User Experience**

*   ⚛️ **React:**  For building **component-based UIs** that are dynamic and responsive, enhancing user engagement.
*   🎨 **CSS Modules:**  Enables **scoped styling** for CSS, promoting modularity and ease of maintenance.
*   🚦 **Redux:**  Implements **centralized state management**, optimizing session handling and data flow within the application.
*   📡 **Fetch API:**  Facilitates **asynchronous HTTP requests**, ensuring smooth and efficient communication between the frontend and backend.
*   💬 **Toast Notifications:**  Provides **user-friendly feedback** for actions and errors, improving user interaction.

### **Backend - The Secure and Scalable Engine**

*   🚀 **Node.js + Express.js:**  Offers a **fast and scalable REST API** underpinned by an efficient, event-driven architecture, ideal for handling numerous requests.
*   💾 **MongoDB + Mongoose:**  Provides a **NoSQL database** solution with flexible schema management, perfect for evolving application needs.
*   🔒 **JWT + Cookie-based Auth:**  Ensures **secure authentication** through stateless tokens combined with HTTP-only cookies for session management.
*   🔑 **bcryptjs:**  Employs **secure password hashing** to protect sensitive user credentials effectively.
*   📧 **Nodemailer:**  Automates **email notifications** for key user interactions, enhancing user communication.
*   🌐 **CORS:**  Manages **secure cross-origin requests**, allowing controlled access to the API from authorized domains.
*   ⚙️ **dotenv:**  Facilitates **environment variable management**, ensuring secure and adaptable configurations across environments.

---

## ✨ Key Features

Apex Auth delivers a secure, user-centric, and developer-friendly authentication experience through these core features:

### 🔒 Secure Password Handling

*   **User Registration with Robust Validation:**

    *   **Comprehensive Registration Form:**  Facilitates easy account creation with fields for **full name, email, and a secure password**, designed for intuitive user interaction.

        ```
        Screenshots/registration-form.png
        ```

        > *Example: A clean and accessible registration form prompting for essential user details.*

    *   **Password Complexity Enforcement:**  Guarantees strong password creation by enforcing policies including:

        *   Minimum **8 characters** in length
        *   At least **one uppercase letter**
        *   At least **one number**
        *   At least **one special symbol** (e.g., `!@#$%^&*)`

    *   **Real-time Validation:**  Offers immediate feedback to users, ensuring passwords meet security criteria before submission.

        ```
        Screenshots/password-complexity-validation.png
        ```

        > *Example: Error messages displayed when a user attempts to register with a weak password that doesn't meet complexity requirements.*

*   **Google OAuth Login (Streamlining User Access):**

    *   **One-Click Google Sign-In:**  Provides a seamless login option via Google accounts, enhancing user convenience and accessibility. Utilizes OAuth 2.0 for secure, token-based session management, automatically managing user creation and login processes.

        ```
        Screenshots/google-login-button.png
        ```

        > *Example: Prominent "Sign in with Google" button integrated into the login/signup page.*

### 📧 **User Engagement**

*   **Welcome Emails**

    Sends automated welcome emails post-registration, creating a personalized onboarding experience. These emails include the user's name and highlight key platform features to encourage immediate engagement.

    ![Welcome Email Example](Screenshots/welcome-email-example.png)

*   **Email Notifications for Account Updates (Optional)**

    Extensible to send notifications for critical account actions, enhancing user awareness and security:

    *   **Profile Updates:** Confirms successful modifications to user information.
    *   **Account Deletion:** Provides a final confirmation upon account removal, ensuring transparency and user control.

    ![Profile Update Email](Screenshots/account-update-email.png)
    ![Account Deletion Email](Screenshots/account-deletion-email.png)

*   🔔 **Toast Notifications - Real-time User Feedback**

    *   **Non-Intrusive Feedback:**  Delivers real-time, unobtrusive toast notifications to keep users informed without disrupting their workflow.

    *   **Success and Error Notifications:** Provides clear, immediate feedback for both successful operations and errors:

        *   **Success Examples:** "Sign-in successful!", "Profile updated successfully!"
        *   **Error Examples:** "Invalid email or password.", "Passwords do not match."

        ![Success Toast Notification](Screenshots/success-toast-notification.png)
        ![Error Toast Notification](Screenshots/error-toast-notification.png)

## 🛡️ Security Best Practices

### 🔒 CSRF & XSS Protection

*   **HTTP-only Cookies (XSS Mitigation):**  Reduces session hijacking risks by preventing client-side JavaScript access to cookies.
*   **`SameSite` Cookie Attribute (CSRF Mitigation):**  Manages cookie behavior in cross-site contexts, effectively blocking unauthorized actions.
*   **Backend Input Sanitization:** Protects against injection attacks by rigorously validating and sanitizing all user inputs on the server-side.

### 🔐 Secure Cookies (`HttpOnly`, `Secure`, `SameSite`)

*   **`HttpOnly`**: Restricts cookie access to HTTP requests, enhancing security against script-based attacks.
*   **`Secure`**: Ensures cookies are transmitted exclusively over HTTPS, securing data in transit.
*   **`SameSite`**: Configurable as `'Lax'`, `'Strict'`, or `'None'`, adapting cookie behavior to different deployment scenarios and security needs.

### 🌍 CORS Handling

*   **Cross-Origin Security:**  Precisely controls domain access to the API, preventing unauthorized cross-site requests.
*   **Backend Configuration:**  Employs `cors` middleware, allowing fine-grained control over origins, methods, and headers.
*   **`credentials: true`**: Enables secure, cookie-based cross-origin authentication, essential for modern web architectures.

---

## 👤 Profile Management

### 📄 View & Update Profile

*   **View Profile:**  Allows users to access and review their personal details, including name, email, date of birth, gender, and address, promoting transparency and user control.

    ![Profile View](Screenshots/view-profile-page.png)

*   **Edit Profile:**  Provides users with the ability to modify and update their personal information, ensuring data accuracy and user empowerment.

    ![Edit Profile](Screenshots/edit-profile-page.png)

### 🗑️ Account Deletion

*   **User-Controlled Deletion:**  Offers users a straightforward mechanism to permanently delete their accounts, reflecting a commitment to user agency and data privacy. Notifies users and ensures permanent account removal upon confirmation.

    ![Delete Account](Screenshots/delete-account-confirmation.png)

---

## 🚀 Modern Architecture

### 🔗 Frontend & Backend Separation

*   **Scalable:**  Enables independent scaling of frontend and backend components, optimizing resource utilization and performance.
*   **Maintainable:**  Promotes a modular codebase, simplifying updates and feature additions through clear separation of concerns.

### 📡 RESTful API Communication

*   **Standardized HTTP Methods:**  Utilizes GET, POST, PUT, and DELETE methods for structured and predictable API interactions.
*   **Stateless & Scalable:**  Enhances scalability and simplifies server-side processing through stateless request handling.
*   **Interoperable:**  Designed to support diverse frontend technologies, ensuring broad compatibility and future-proofing.

    ![API Endpoints](Screenshots/restful-api-endpoints-example.png)

### 🛠️ Scalable & Maintainable Codebase

*   **Modular Code:**  Organized into reusable components and modules, enhancing maintainability and scalability.
*   **Error Handling & Logging:**  Includes robust error management and detailed logging for improved application reliability and easier debugging.
*   **Environment Variables (`dotenv`):**  Leverages `.dotenv` for secure and manageable configuration across different deployment environments.

---

## 🌐 Live Demo

🔗 **[Try Apex Auth](https://apex-auth-frontend.onrender.com/)**

---

## 🚀 Installation & Setup

### ⚙️ Prerequisites

Ensure the following tools are installed on your system:

*   **Node.js (v18+)**: [Download](https://nodejs.org/)
*   **npm/yarn**: [Install Yarn](https://yarnpkg.com/getting-started/install)
*   **MongoDB (Local or Atlas)**: [Setup MongoDB](https://www.mongodb.com/docs/manual/installation/)

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

---
