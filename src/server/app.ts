import express from 'express';
import cors from 'cors';
import { todosRouter } from './routes/todos.routes';
import { httpLogger } from './logger';

export function createServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);


  app.use('/api/todos', todosRouter);

  app.get('/health', (_req, res) => res.json({ ok: true }));

  // Error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Internal server error' });
  });

  return app;
}
