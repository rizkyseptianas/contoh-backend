const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/authcontrollers.js');
const authmiddlewares = require('../middlewares/authmiddlewares.js');

//public routes
router.post('/register', authcontrollers.register);
router.post('/login', authcontrollers.login);

//protected route example
router.get('/profile', authmiddlewares, (req, res) => {
  res.json({ 
    message: 'Protected data', 
    userId: req.userId 
  });
});

module.exports = router;