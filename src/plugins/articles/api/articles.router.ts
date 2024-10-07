import { Request, Response, Router } from 'express';
import ArticlesRepository from '../repositories/articles.repository';

const articlesRepository = new ArticlesRepository();

const articlesRouter = Router();

articlesRouter.get('/', async (_req: Request, res: Response) => {
  const article = await articlesRepository.findOneByOrFail({
    id: '9d062fad-00fc-46f8-8521-8324507f5f2a'
  });

  res.json(article);
});

export default articlesRouter;
