const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

const URI = MONGODB_URI ? MONGODB_URI : 'mongodb://localhost/guitarstore';

mongoose.connect(URI, {
    useNewUrlParser: true
})
    .then(db => console.log('>>> DB is connected to', URI))
    .catch(err => console.log(err));

module.exports = mongoose;