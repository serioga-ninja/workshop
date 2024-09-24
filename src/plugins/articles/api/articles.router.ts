import { Router } from 'express';

const articlesRouter = Router();

articlesRouter.get('/', (_req, res) => {
  res.send('Hello from articles router');
});

export default articlesRouter;
