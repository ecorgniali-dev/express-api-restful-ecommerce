require('dotenv').config();

module.exports = {

    PERSISTENCIA: process.env.PERSISTENCIA || 'fileSystem',

    MODO_CLUSTER: false,

    // config mySql Knex
    mySql: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME
        },
        pool: { min: 0, max: 7 }
    },

    // url mongoDB
    MONGO_URL: process.env.MONGO_URL,
    MONGO_URL_ATLAS: process.env.MONGO_URL_ATLAS,

    // KEY SECRETA SESSION
    SECRET_KEY_SESSION: process.env.SECRET_KEY_SESSION,

    // credenciales Gmail
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,

    // credenciales Twilio
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUM_SMS: process.env.TWILIO_NUM_SMS,
    TWILIO_NUM_WHATSAPP: process.env.TWILIO_NUM_WHATSAPP,

    // puerto servidor express
    PORT: process.env.PORT || 8080,

    // configuración de permisos administrador (true o false)
    admin: true,

    // mail admin
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP
}