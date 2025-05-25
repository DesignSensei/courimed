const authService = require('../services/authService');

exports.registerUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'User not found' || error.message === 'Invalid password') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};