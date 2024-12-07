const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const accountRepository = require('../repositories/user-repository');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

router.post('/register', [
    body('name').isLength({ min: 5 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const user = {
        userName: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    accountRepository.createUser(user, (error, data) => {
        if (error) {
            res.json({
                success: false,
                msg: 'User was not created',
                error: error
            });
        }
        else {
            res.json(data);
        }
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    accountRepository.getUserByEmail(email, (err, users) => {
        const user = users[0];

        if (!user) {
            return res.json({ success: false, msg: "User does not exist."});
        }
        
        accountRepository.comparePass(password, user.PasswordHash, (err, isAuthenticated) => {
            if (isAuthenticated) {
                const token = jwt.sign(user, db.jwtSecret, {
                    expiresIn: 3600 * 24
                });

                return res.json({
                    success: true,
                    token: `bearer ${token}`,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.userName
                    }
                })
            }
            else {
                return res.json({ success: false, msg: "Password not correct."});
            }
        });
    });
});

router.get('/dashboard', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
    res.send("Dashboard page!")
});

router.get('/isLoggedIn', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
    res.json(true);
});

module.exports = router;