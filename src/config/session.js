const MongoStore = require('connect-mongo');
const config = require('../config/config');

module.exports = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL_ATLAS,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: config.SECRET_KEY_SESSION,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}