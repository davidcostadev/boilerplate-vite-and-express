import express from 'express';
import ViteExpress from 'vite-express';
import { Request, Response } from 'express';

const app = express();

app.get('/api', (_req: Request, res: Response) => {
  res.send('Hello from express!');
});

const server = app.listen(9000, '0.0.0.0', () =>
  console.log(`Server is listening... at http://localhost:${9000}`)
);

ViteExpress.bind(app, server);
