const OTP = require('../models/Otp');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (email) => {
  const otp = generateOtp();
  await OTP.create({ email, code: otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  // Send Email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  });

  return { message: 'OTP sent' };
};

exports.verifyOtp = async (email, otp) => {
  const record = await OTP.findOne({ email, code: otp });
  if (!record) throw new Error('Invalid OTP');

  if (record.expiresAt < Date.now()) throw new Error('OTP expired');

  return { message: 'OTP verified' };
};