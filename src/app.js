const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initializations
const app = express();
require('./database');
require('./config/passport');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('image'));
app.use(session({ secret: 'mysecretsessionforthiswebsite', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// global variables
app.use((req, res, next) => {
    app.locals.messages = req.flash('error');
    next();
});

// Store Routes
app.use('/', require('./routes')); // routes/index.js

// Admin Routes
app.use('/admin', require('./routes/admin'));

// static files
app.use(express.static(path.join(path.join(__dirname, 'public'))));

module.exports = app;