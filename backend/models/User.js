const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "User",
  },
  fullname: {
    type: String,
    default: "Dear User",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://i.pinimg.com/564x/3b/27/a8/3b27a87fcf7d90ae564be23d7a37f778.jpg",
  },
  phoneNumber: {
    type: String, 
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'], 
  },
  dateOfBirth: {
    type: Date,
  },
  isGoogleLogin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  membershipStatus: {
    type: String,
    enum: ['Standard', 'Premium'],
    default: 'Standard', 
  },
  accountVerified: {
    type: String,
    enum: ['Not Verified', 'Verified'],
    default: 'Not Verified',
  },
  languagePreference: {
    type: String,
    enum: ['English', 'Hindi', 'Telugu', 'Tamil'],
    default: 'English', 
  },
  lastLogin: {
    type: Date,
    default: null, 
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
