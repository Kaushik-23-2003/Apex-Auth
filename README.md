# 🚀 Apex Auth – Secure Authentication System

[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)](https://github.com/your-github-username/your-repo-name)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-success?logo=web)](https://apex-auth-frontend.onrender.com/)

<p align="center">
  <img src="Screenshots/key.png" alt="Apex Auth Logo" width="200">
</p>

<p align="center">
  ✨ <strong>Apex Auth: Modern, Secure Authentication for Web Applications.</strong> ✨
</p>

---

## 📝 Project Description

Apex Auth:  Secure, Scalable, Authentication.  Built for modern web applications, this system provides a complete and robust authentication solution, encompassing JWT, Google OAuth, HTTP-only cookies, bcrypt, and email notifications.  With a decoupled React frontend and Node.js backend, Apex Auth delivers a secure RESTful API, ensuring performance, maintainability, and ease of integration so you can focus on building your application's core features.

---

## 🛠️ Tech Stack

*   **Frontend:** React, CSS Modules, Redux, Fetch API, Toast Notifications
*   **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Nodemailer, CORS, dotenv

---

## ✨ Key Features

*   🔒 **Secure Authentication:** User Registration, Login, Google Authentication
*   🔑 **Robust Password Handling:** Complexity Enforcement, bcrypt Hashing
*   🍪 **Session Management:** HTTP-only Cookies, JWT
*   📧 **User Engagement:** Welcome Emails, Account Update Notifications, Toast Notifications
*   🛡️ **Security Best Practices:** CSRF & XSS Protection, Secure Cookies, CORS Handling
*   👤 **Profile Management:** View, Update, and Delete User Profiles
*   🚀 **Modern Architecture:** Decoupled Frontend & Backend, RESTful API, Scalable Codebase

---

## 🌐 Live Demo

🔗 **[Try Apex Auth](https://apex-auth-frontend.onrender.com/)**

---

## 📸 Screenshots

| Feature             | Screenshot                                  |
| ------------------- | ------------------------------------------- |
| **Registration Form** |  *(Insert Screenshot Path Here)*          |
| **Google OAuth Login**|  *(Insert Screenshot Path Here)*          |
| **Profile View**      |  *(Insert Screenshot Path Here)*          |
| **Edit Profile**      |  *(Insert Screenshot Path Here)*          |
| **Account Deletion**  |  *(Insert Screenshot Path Here)*          |

---

## 🏗️ Project Architecture

```bash
ApexAuth/
├── frontend/        # React frontend
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/         # Express backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── ...
│
├── .env             # Environment variables
├── README.md        # Documentation
├── package.json     # Dependencies
└── ...
```

---

## 🚀 Getting Started

### ⚙️ Prerequisites

*   **Node.js (v18+)**: [Download](https://nodejs.org/)
*   **npm or yarn**: [Install Yarn](https://yarnpkg.com/getting-started/install)
*   **MongoDB (Local or Atlas)**: [Setup MongoDB](https://www.mongodb.com/docs/manual/installation/)

### 🔧 Installation

**Clone the Repository:**

```bash
git clone https://github.com/Kaushik-23-2003/Apex-Auth.git
cd Apex-Auth
```

**Frontend (React):** http://localhost:5173

```bash
cd frontend
npm install   # or yarn install
npm run dev   # or yarn dev
```

**Backend (Node.js + Express):** http://localhost:5000

```bash
cd backend
npm install   # or yarn install
# Create .env in backend/ and configure variables
npm run dev   # or yarn dev
```

**Backend .env Configuration:**

```bash
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
SENDER_EMAIL=YOUR_EMAIL@example.com
SENDER_EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD
```

---

## 🔗 API Endpoints

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| `POST` | `/api/auth/register` | User registration       |
| `POST` | `/api/auth/login`    | User login              |
| `GET`  | `/api/auth/logout`   | Logout user             |
| `GET`  | `/api/user/profile`  | Get user profile        |
| `PUT`  | `/api/user/update`   | Update user profile     |
| `DELETE`| `/api/user/delete`  | Delete user account     |

> **Full API Documentation:** Check `backend/routes/` for detailed API specifications.

---

## 🛠 Development & Contribution

### 🤝 Contributing Guidelines

1.  Fork the repository.
2.  Create branch: `git checkout -b feature/new-feature`
3.  Commit changes: `git commit -m "Add: New feature"`
4.  Push branch: `git push origin feature/new-feature`
5.  Open a **Pull Request**.

---

## 📞 Contact

👤 **Hariharan Kaushik** - Project Creator

📧 **Email:** kaushikhariharan2003@gmail.com

🌐 **Live Demo:** [Apex Auth](https://apex-auth-frontend.onrender.com/)

---
