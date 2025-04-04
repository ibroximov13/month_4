const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'one-to-many Category and Products API',
    version: '1.0.0',
    description: 'API for managing category1 table',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
