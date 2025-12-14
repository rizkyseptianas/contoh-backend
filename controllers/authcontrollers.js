const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');

module.exports = {
  register: (req, res) => {
    const { name, email, password } = req.body;
    
    // 1. Cek email exist
    user.findByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email sudah digunakan' });
      }
      
      // 2. Hash password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // 3. Simpan user
        user.create(
          { name, email, password: hashedPassword },
          (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            
            res.status(201).json({
              message: 'User created',
              userId: result.insertId
            });
          }
        );
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    
    user.findByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const user = results[0];
      
      // Bandingkan password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Buat JWT token
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        
        res.json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      });
    });
  }
};

