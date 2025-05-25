const otpService = require('../services/otpService');

exports.sendOtp = async (req, res) => {
  try {
    const result = await otpService.sendOtp(req.body.email);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await otpService.verifyOtp(email, otp);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};