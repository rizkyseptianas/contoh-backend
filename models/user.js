const db = require("../config/database.js")

const User = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.query(sql, (err) => {
      if (err) {
        console.error('❌ Gagal buat tabel:', err.message);
      } else {
        console.log('✅ Tabel users siap');
      }
    });
  },

  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },

  create: (userData, callback) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [userData.name, userData.email, userData.password];
    db.query(sql, values, callback);
  }
};

// auto buat tabel
User.createTable();

module.exports = User;