import { Router, Request, Response } from 'express';
import { getData } from '../lib';

const router = Router();

router.get("/articles", async (req: Request, res: Response) => {
  try {
    const { Articles } = await getData()
    res.json(Articles[0].Article)
  } catch (err){
    res.status(500).send(err)
  }
})

router.get("/articles/:id", async (req: Request, res: Response) => {
  try {
    const { Articles } = await getData()

    const article = Articles[0].Article.find((article) => article.ArticleID[0] === req.params.id)

    if (!article) {
      res.status(404).send("Article not found")
    }

    res.json(article)
  } catch (err){
    res.status(500).send(err)
  }
})

export default router;