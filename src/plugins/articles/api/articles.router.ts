import { Request, Response, Router } from 'express';

const articlesRouter = Router();

articlesRouter.get('/', (_req: Request, res: Response) => {
  res.send('Hello from articles router');
});

export default articlesRouter;
