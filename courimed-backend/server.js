require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {

await connectDB();

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const otpRoutes = require('./routes/otpRoutes');
app.use('/api/auth', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();