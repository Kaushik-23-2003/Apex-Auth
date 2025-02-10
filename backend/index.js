const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const debug = require('debug');
const cookieParser = require('cookie-parser');

// Debug namespaces
const dbDebug = debug('app:db');
const serverDebug = debug('app:server');
const envDebug = debug('app:env');

// App initialization
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',  // Ensure this is set in your .env file
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Enable cookies with cross-origin requests
}));

// Manually setting the Access-Control-Allow-Credentials header (to ensure it's applied)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next(); // Proceed to the next middleware or route handler
});

app.use(express.json());
app.use(cookieParser());

// Environment logging
const environment = process.env.NODE_ENV || 'production';
envDebug(`Running in ${environment} mode`);

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// Improved MongoDB connection with retry logic
const connectToDatabase = async () => {
  try {
    // Remove deprecated flags if you're using Mongoose 6+
    await mongoose.connect(process.env.MONGO_URI);
    dbDebug('Connected to MongoDB successfully');
  } catch (error) {
    dbDebug('Error connecting to MongoDB:', error);
    setTimeout(connectToDatabase, 15000); // Retry after 5 seconds
  }
};

// Start server
const startServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    serverDebug(`Server running on port ${PORT}`);
  });
};

// Initialize application
const initializeApp = async () => {
  await connectToDatabase();
  startServer();
};

initializeApp();
