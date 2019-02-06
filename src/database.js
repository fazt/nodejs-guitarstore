const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log('>>> DB is connected'))
    .catch(err => console.log(err));