const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database.js');

const authroutes = require('./routes/authroutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

//routes
app.use('/api/auth', authroutes);

//test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Backend Project_Kita API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      }
    }
  });
});

//start server
app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`📅 Started: ${new Date().toLocaleString()}`);
  console.log(`🔗 API Docs: http://localhost:${PORT}/`);
});