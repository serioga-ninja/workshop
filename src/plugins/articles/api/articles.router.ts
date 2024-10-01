import { Request, Response, Router } from 'express';
import { Articles } from 'src/db/entities';
import { pgdb } from 'src/db/typeorm';

const articlesRouter = Router();

articlesRouter.get('/', async (_req: Request, res: Response) => {
  const article = await pgdb.getRepository(Articles).findOneBy({
    id: '9d062fad-00fc-46f8-8521-8324507f5f2a'
  })

  res.json(article);
});

export default articlesRouter;
