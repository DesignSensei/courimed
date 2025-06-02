const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtp } = require('./otpService');
const { verifyOtp } = require('./otpService');

exports.register = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) throw new Error('All fields are required');

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already exists');

  const user = new User({ name: `${firstName} ${lastName}`, email, password });
  await user.save();

  await sendOtp(email);

  console.log(`User created for ${email}, document:`, user);
  return { message: 'Registration initiated. Please verify your OTP.', user: { name, email }, verified: false };
};

exports.login = async ({ email, password }) => {
  if (!email || !password) throw new Error('All fields are required');

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { message: 'Login successful', user: { name: user.name, email: user.email }, token };
};

exports.verifyUser = async ({ email, otp }) => {
  await verifyOtp(email, otp);

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  user.verified = true;
  await user.save();

  return { message: 'User verified successfully', user: { name: user.name, email: user.email }, verified: true };
};