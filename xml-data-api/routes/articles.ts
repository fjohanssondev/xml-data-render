import { Router, Request, Response } from 'express';
import { getData } from '../lib';

const router = Router();

router.get("/articles/:id", async (req: Request, res: Response) => {
  try {
    const data = await getData()

    const allArticles = data.StartDepartment.MenuDepartment.flatMap((folder: any) => 
      Array.isArray(folder.TextArticle) ? folder.TextArticle : []
    )

    const article = allArticles.find((article: any) => article.$?.id === req.params.id)

    if (!article) {
      res.status(404).send({ message: "Article not found" })
    }

    res.json(article)
  } catch (err){
    res.status(500).send(err)
  }
})

export default router