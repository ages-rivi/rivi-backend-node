const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Rivi API',
      description: 'Informações sobre a API do Rivi.',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
      {
        url: 'https://rivi-backend-node.onrender.com',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerDocs,
};
