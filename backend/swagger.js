// swagger.js
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Task Tracker Lite API',
    description: 'Auto-generated API documentation',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/server.routes.js']; // or main route entry

swaggerAutogen()(outputFile, endpointsFiles, doc);
