import { Request, Response, Router } from 'express';
import { pgdb } from 'src/db';
import { Articles } from 'src/db';

const articlesRouter = Router();

articlesRouter.get('/', async (_req: Request, res: Response) => {
  const article = await pgdb.getRepository(Articles).findOneBy({
    id: 'ac11da5d-cb1a-4a77-b54b-58bd397e0f28',
  });

  res.json(article);
});

export default articlesRouter;
