const config = require('./config');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación API Rest Ecommerce',
            version: '1.0.0',
            description:
                'Esta es una aplicación API REST Ecommerce hecha con Express'
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`,
                description: 'Servidor de desarrollo'
            },
            {
                url: `${config.URL_BASE}`,
                description: 'Servidor de producción'
            },
        ],
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