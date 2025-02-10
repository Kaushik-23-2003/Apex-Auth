# Apex Auth: Secure Authentication Website

[![Project Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)](https://github.com/your-github-username/your-repo-name)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Render Frontend Deployment](https://img.shields.io/badge/Render-Frontend%20Deployed-blueviolet?logo=render)](YOUR_FRONTEND_RENDER_URL)
[![Render Backend Deployment](https://img.shields.io/badge/Render-Backend%20Deployed-blueviolet?logo=render)](YOUR_BACKEND_RENDER_URL)

<p align="center">
  <img src="path/to/your/project-logo.png" alt="Project Logo" width="200">
</p>

<p align="center">
  <strong>A robust and secure authentication website built with modern web technologies and deployed seamlessly on Render.</strong>
</p>

<br>

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Live Demo](#live-demo)
- [Getting Started (Local Development)](#getting-started-local-development)
  - [Prerequisites](#prerequisites)
  - [Frontend Installation](#frontend-installation)
  - [Backend Installation](#backend-installation)
  - [Running the Application](#running-the-application)
- [Deployment on Render](#deployment-on-render)
  - [Frontend Deployment](#frontend-deployment-1)
  - [Backend Deployment](#backend-deployment-1)
  - [Environment Variables (Render)](#environment-variables-render)
  - [Firebase OAuth Configuration](#firebase-oauth-configuration)
- [Backend API Endpoints](#backend-api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<br>

## Project Description

Apex Auth is a fully functional authentication website designed to provide secure and convenient user registration, login, and session management. This project showcases best practices in modern web development, utilizing a decoupled frontend and backend architecture deployed on Render for scalability and reliability.  It's built to be a solid foundation for any web application requiring user authentication.

<br>

## Tech Stack

This project utilizes the following technologies:

**Frontend:**

-   **Framework:** [React](https://reactjs.org/) - For building a dynamic and interactive user interface.
-   **Styling:** [CSS Modules](https://github.com/css-modules/css-modules) - For modular and maintainable CSS styling.
-   **State Management:** [Redux](https://redux.js.org/) (or Context API) - For managing application state (adjust as per your project).
-   **HTTP Client:** [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (or [Axios](https://axios-http.com/)) - For making API requests to the backend.
-   **UI Icons:** [Font Awesome](https://fontawesome.com/) - For consistent and scalable icons.
-   **Toast Notifications:** [Custom Toast Context] (or [react-toastify](https://github.com/fkhadra/react-toastify)) - For user-friendly notifications.

**Backend:**

-   **Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) - For building a robust and scalable RESTful API.
-   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) - For flexible and scalable data storage.
-   **Authentication:** [JWT (JSON Web Tokens)](https://jwt.io/) & [Cookie-based Sessions] - For secure user authentication and session management.
-   **Password Hashing:** [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For securely hashing user passwords.
-   **Email Sending:** [Nodemailer](https://nodemailer.com/about/) (or [Resend](https://resend.com/)) - For sending welcome and other transactional emails.
-   **CORS:** [cors](https://www.npmjs.com/package/cors) - For enabling Cross-Origin Resource Sharing to allow frontend access.
-   **Environment Variables:** [dotenv](https://www.npmjs.com/package/dotenv) - For managing environment variables securely.

**Deployment:**

-   **Platform:** [Render](https://render.com/) - For seamless deployment of both frontend and backend services.
-   **OAuth:** [Firebase Authentication](https://firebase.google.com/docs/auth) - For Google OAuth login (if implemented).

<br>

## Key Features

-   **Secure User Registration:**
    -   Full name, email, and password registration.
    -   Password complexity validation.
    -   Email verification (optional, if implemented).
    -   Welcome email upon successful registration.
-   **Robust User Login:**
    -   Email and password-based login.
    -   Google OAuth login (optional, if implemented).
    -   Session-based authentication using HTTP-only cookies for enhanced security.
-   **Session Management:**
    -   Persistent sessions using cookies.
    -   Secure cookie settings (HttpOnly, Secure, SameSite).
    -   Logout functionality.
-   **Frontend & Backend Separation:**
    -   Clean separation of concerns for maintainability and scalability.
    -   RESTful API for communication between frontend and backend.
-   **Render Deployment Ready:**
    -   Configuration optimized for easy deployment on Render.
    -   Environment variable setup for Render.
-   **Error Handling and Notifications:**
    -   User-friendly error messages and toast notifications for feedback.
    -   Backend error logging (using `debug` or similar).
-   **Password Complexity Validation:**
    -   Enforces strong password policies during registration.
-   **Welcome Email:**
    -   Automated welcome email sent to new users upon registration.
-   **Google OAuth Login:**
    -   (Optional) Integration with Google OAuth for simplified login.

<br>

## Live Demo

[**[Link to your Live Website]**](YOUR_FRONTEND_RENDER_URL)

<!-- If you have a video demo, you can embed it here -->
<!--
[![Watch the Demo](https://img.youtube.com/vi/YOUR_YOUTUBE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_YOUTUBE_VIDEO_ID)
-->

<br>

## Getting Started (Local Development)

Follow these steps to set up the project for local development on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 18 or higher recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager
-   [MongoDB](https://www.mongodb.com/community/server) (or access to a MongoDB Atlas cluster)
-   [Render CLI](https://render.com/docs/render-cli) (optional, for Render-specific commands)

### Frontend Installation

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install frontend dependencies:**

    ```bash
    npm install  # or yarn install
    ```

### Backend Installation

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Set up environment variables:**

    -   Create a `.env` file in the `backend` directory.
    -   Add the following environment variables, replacing the placeholders with your actual values:

        ```env
        PORT=5000 # Or any port for your backend
        MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
        JWT_SECRET=YOUR_JWT_SECRET_KEY # Generate a strong secret key
        SENDER_EMAIL=YOUR_EMAIL_ADDRESS # For sending emails (if email functionality is used)
        SENDER_EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD # Or use an App Password
        NODE_ENV=development # Set to 'production' for production environment
        FRONTEND_URL=http://localhost:5173 # or your frontend dev URL
        ```

        **Important:** For `JWT_SECRET`, generate a strong, random string and keep it secret. For email sending, configure your email provider details.

### Running the Application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev # or yarn dev (if you have a dev script in package.json, e.g., using nodemon)
    # or npm start (for production-like start if you have a start script)
    ```

    The backend server should now be running at `http://localhost:5000` (or the port you configured in `.env`).

2.  **Start the frontend development server:**

    ```bash
    cd frontend
    npm run start # or yarn start (typically starts a React development server)
    ```

    The frontend application should now be running at `http://localhost:5173` (or the default port for your frontend framework).

3.  **Access the application in your browser:** Open your browser and go to `http://localhost:5173`.

<br>

## Deployment on Render

This project is configured for easy deployment on [Render](https://render.com/). Follow these steps to deploy your own instance.

### Frontend Deployment

1.  **Create a new Static Site on Render:**
    -   Go to [Render Dashboard](https://dashboard.render.com/) and create a New Static Site.
    -   Connect your repository (where your frontend code is hosted).
2.  **Configure Build Settings:**
    -   **Build Command:** `npm run build` (or `yarn build`)
    -   **Publish directory:** `dist` (or `build`, `public`, depending on your frontend build output directory)
3.  **Deploy:** Click "Create Static Site" to deploy your frontend.
4.  **Note your Frontend Render URL:** Once deployed, Render will provide a live URL for your frontend (e.g., `your-frontend-name.onrender.com`).

### Backend Deployment

1.  **Create a new Web Service on Render:**
    -   Go to [Render Dashboard](https://dashboard.render.com/) and create a New Web Service.
    -   Connect your repository (where your backend code is hosted).
2.  **Configure Build and Start Settings:**
    -   **Environment:** Node
    -   **Build Command:** `npm install` (or `yarn install`)
    -   **Start Command:** `node index.js` (or `npm start`, `yarn start`, depending on your `package.json` scripts)
3.  **Set Environment Variables:**
    -   In the Render Web Service settings, go to the "Environment" tab.
    -   Add the following environment variables under "Environment Variables", using your actual production values (especially `MONGO_URI`, `JWT_SECRET`, `SENDER_EMAIL`, `SENDER_EMAIL_PASSWORD`):

        | Key                   | Value                                       |
        | --------------------- | ------------------------------------------- |
        | `PORT`                | `10000` (or any port your backend listens on) |
        | `MONGO_URI`           | `YOUR_PRODUCTION_MONGODB_CONNECTION_STRING` |
        | `JWT_SECRET`          | `YOUR_PRODUCTION_JWT_SECRET_KEY`            |
        | `SENDER_EMAIL`        | `YOUR_PRODUCTION_EMAIL_ADDRESS`             |
        | `SENDER_EMAIL_PASSWORD` | `YOUR_PRODUCTION_EMAIL_PASSWORD`          |
        | `NODE_ENV`            | `production`                                |
        | `FRONTEND_URL`        | `YOUR_FRONTEND_RENDER_URL`                  |

        **Important:** Ensure `NODE_ENV` is set to `production` in your Render backend environment variables. Use strong, production-ready values for secrets and credentials.

4.  **Deploy:** Click "Create Web Service" to deploy your backend.
5.  **Note your Backend Render URL:** Once deployed, Render will provide a live URL for your backend (e.g., `your-backend-name.onrender.com`).

### Environment Variables (Render)

Here's a summary of the environment variables you need to configure in your Render backend service:

| Variable              | Description                                                                                                                                                                                                                              | Example Value                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`                | The port your backend server will listen on. Render typically provides `10000` as the default.                                                                                                                                         | `10000`                                                                       |
| `MONGO_URI`           | Your MongoDB connection string. For production, use a secure and reliable MongoDB instance (e.g., MongoDB Atlas).                                                                                                                          | `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/your-database` |
| `JWT_SECRET`          | A strong, randomly generated secret key used to sign and verify JSON Web Tokens (JWTs). **Keep this secret and secure!**                                                                                                              | `a-very-long-random-string-for-jwt-secret`                                  |
| `SENDER_EMAIL`        | Your email address used for sending emails (e.g., welcome emails). Configure this if you are using email functionality.                                                                                                                   | `noreply@yourdomain.com`                                                      |
| `SENDER_EMAIL_PASSWORD` | The password or app password for your sender email account. **Handle securely!** Consider using environment variables or secure configuration for email credentials instead of hardcoding.                                                | `your_email_password`                                                         |
| `NODE_ENV`            | Set to `production` to indicate a production environment. This can affect how your application behaves (e.g., logging, error handling, optimizations).                                                                                   | `production`                                                                  |
| `FRONTEND_URL`        | The URL of your deployed frontend application on Render (e.g., `your-frontend-name.onrender.com`). Used for CORS configuration to allow requests from your frontend.                                                                    | `https://your-frontend-name.onrender.com`                                   |

### Firebase OAuth Configuration

If you are using Firebase for Google OAuth login, you need to configure authorized domains in your Firebase project:

1.  **Go to your Firebase Console:** [https://console.firebase.google.com/](https://console.firebase.google.com/)
2.  **Select your Firebase project.**
3.  **Navigate to "Authentication" in the left sidebar.**
4.  **Go to the "Settings" tab.**
5.  **In "Authorized domains," add your Frontend Render URL:**  `apex-auth-frontend.onrender.com` (replace with your actual frontend Render URL).
6.  **Save changes.**

<br>

## Backend API Endpoints

Here's a list of the main API endpoints exposed by the backend:

**Authentication Endpoints (`/api/auth`)**

-   `POST /api/auth/signup`: Register a new user.
    -   Request body: `{ fullname, email, password, confirmPassword }`
    -   Response: User object on success, error message on failure.
-   `POST /api/auth/signin`: Login an existing user.
    -   Request body: `{ email, password }`
    -   Response: User object on success, error message on failure.
-   `POST /api/auth/gmail`: Google OAuth login (if implemented).
    -   Request body: `{ email, name, photo }` (from Google OAuth)
    -   Response: User object on success, error message on failure.
-   `POST /api/auth/signout`: Logout user (clears session cookie).
    -   Response: Success message.

**User Endpoints (`/api/user`)**

-   `GET /api/user/update/:userId`: Get user details (example protected route).
    -   Requires authentication (cookie-based session).
    -   Response: User object on success, 401 Unauthorized if not authenticated.
    -   *(Add other user-related endpoints as needed)*

<br>

## Contributing

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin feature/your-feature-name`
5.  Submit a pull request.
