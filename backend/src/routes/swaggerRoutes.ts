import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'GoboRemit API',
    version: '1.0.0',
  },
  paths: {
    '/api/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: { required: true },
        responses: { '201': { description: 'User registered' } },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'Login',
        requestBody: { required: true },
        responses: { '200': { description: 'Login successful' } },
      },
    },
    '/api/transfers': {
      post: {
        summary: 'Create transfer request',
        requestBody: { required: true },
        responses: { '201': { description: 'Transfer request received' } },
      },
    },
  },
};

const router = Router();
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default router;
