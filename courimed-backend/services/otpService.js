const OTP = require('../models/Otp');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (email) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email confguration is missing. Please set EMAIL_USER and EMAIL_PASS in your environment variables.');
  }

  const otp = generateOtp();
  try {
    await OTP.create({ email, code: otp });
    console.log(`OTP ${otp} created for ${email}`);
  } catch (error) {
    console.error(`Error creating OTP for ${email}:`, error);
    throw new Error('Failed to save OTP');
  }

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
    subject: 'Courimed OTP Verification',
    
    // HTML Template Literal that customizes the email
    html: `
      <div style="font-family: Nunito, sans-serif; max-width:  600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd;">
      
        <h2 style="color: #2c3e50;">Courimed OTP Verification</h2>

        <p style="color: #34495e;">Thank you for using Courimed. Your one-time password (OTP) for verification is:</p>

        <h1 style="color: #dd5d05; text-align: center; background-color: #fff; padding: 10px; border-radius: 5px; display: inline-block;">${otp}</h1>

        <p style="color: #34495e;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>

        <hr style="border: 0; border-top: 1px solid #ddd;">

        <p style="color: #7f8c8d; font-size: 12px;">&copy; 2025 Courimed. All rights reserved.</p>
      </div>
    `,
  });

  return { message: 'OTP sent' };
};

exports.verifyOtp = async (email, otp) => {
  const record = await OTP.findOne({ email, code: otp });
  if (!record) throw new Error('Invalid OTP');

  if (record.expiresAt < Date.now()) throw new Error('OTP expired');

  await OTP.deleteOne({ email, code: otp });

  return { message: 'OTP verified' };
};