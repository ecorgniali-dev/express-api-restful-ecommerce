const config = require('./config');

const swaggerOptions = {
    definition: {
        info: {
            title: 'Documentación - Ecommerce API Rest',
            contact: {
                name: 'Corgniali Eduardo'
            },
            servers: [`http://localhost:${config.PORT}`]
        },
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                description: 'Autorización JWT para la API',
                name: 'Authorization',
                in: 'header',
            },
        },
        security: [
            {
                JWT: []
            }
        ]
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;