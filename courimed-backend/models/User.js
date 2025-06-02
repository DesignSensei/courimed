const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true  
  },
  
  email: { 
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{11}$/, 'Phone number must be 11 digits']
  },

  password: { 
    type: String, 
    required: true,
    minlength: 8
  },

  city: {
    type: String,
    required: true
  },

  verified: {
    type: Boolean,
    default: false
  }
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
try {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
} catch (error) {
  next(error);
}
});

module.exports = mongoose.model('User', userSchema);