const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const db = mysql.createConnection(config.dbConnection);

db.connect(err => {
    if (err) {
        console.log('MySql connection failed!');
        throw err;
    }

    console.log('MySql connected!');
});

module.exports.getUserByEmail = function(email, callback) {
    const sql = `SELECT 
                        Id, 
                        UserName, 
                        Email,
                        PasswordHash
                    FROM users
                    WHERE Email = ?`;
    
    db.query(sql, [email], callback);
}

module.exports.getUserById = function(id, callback) {
    const sql = `SELECT 
                        Id, 
                        UserName, 
                        Email
                    FROM users
                    WHERE Id = ?`;

    db.query(sql, [id], callback);
}

module.exports.createUser = function(user, calback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            
            user.password = hash;

            const sql = "INSERT INTO users (UserName, Email, PasswordHash) VALUES (?, ?, ?)";

            db.query(sql, [user.userName, user.email, user.password], calback);
        })
    });
}

module.exports.comparePass = function(password, dbPassword, callback) {
    bcrypt.compare(password, dbPassword, (err, isMatch) => {
        callback(null, isMatch);
    });
}