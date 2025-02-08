import { Router, Request, Response } from 'express'
import { getData } from '../lib'

const router = Router()

router.get("/folders", async (req: Request, res: Response) => {
  try {
    const data = await getData()
    const folders = data.StartDepartment.MenuDepartment.map((folder: any) => ({
      id: folder.$.id,
      title: folder.$.title,
      subfolders: Array.isArray(folder.TextArticle)
    ? folder.TextArticle.map((subfolder: any) => ({
        id: subfolder.$?.id || "???",
        title: subfolder.$?.title || "???",
      }))
    : [],
    }))
    res.json(folders)
  } catch (err){
    res.status(500).send(err)
  }
})

export default router