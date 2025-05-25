const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async ({ name, email, password }) => {
  if (!name || !email || !password) throw new Error('All fields are required');

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already exists');

  const user = new User({ name, email, password });
  user.password = await bcrypt.hash(password, 10);
  await user.save();

  return { message: 'User registered', user: { name, email } };
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