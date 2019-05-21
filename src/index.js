if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./app');

async function main() {
    app.listen(app.get('port'));
    if (process.env.NODE_ENV !== 'production') {
        console.log('>>> Server on port:', app.get('port'));
        console.log('>>> Environment:', process.env.NODE_ENV);
    }
}

main();