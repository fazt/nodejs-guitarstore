const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const multer = require('multer');

// Initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));

// global variables

// Store Routes
app.use('/', require('./routes')); // routes/index.js

// Admin Routes
app.use('/admin', require('./routes/admin'));

// static files
app.use(express.static(path.join(path.join(__dirname, 'public'))));

module.exports = app;