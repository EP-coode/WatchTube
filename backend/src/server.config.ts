import express, { Application } from 'express';
import cors from 'cors';

const createExpressApp = (): Application => {
  const app = express();

  app.use(cors());

  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  return app;
};

export { createExpressApp };
