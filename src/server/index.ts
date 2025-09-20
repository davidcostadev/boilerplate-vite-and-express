import { createServer } from './app';
import { logger } from './logger';

const port = Number(process.env.PORT || 3001);

const app = createServer();

app.listen(port, () => {
  logger.info({ port }, '[server] listening');
});
