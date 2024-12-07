const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const mysql = require('mysql2');
const passport = require('passport');
const path = require('path');
const db = require('./config/db');
const configurePassportJS = require('./config/passport');
const account = require('./routes/account');
var session = require('express-session');
const app = express();

const port = 3001;

app.use(session({ secret: db.jwtSecret }));
app.use(passport.initialize());
app.use(passport.session());
configurePassportJS(passport);

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Hi. This is home page.")
});

app.use('/account', account);

app.listen(port, () => {
    console.log("Server started: " + port);
});
