import { Router, Request, Response } from 'express'
import { getData, processFolder } from '../lib'

const router = Router()

router.get("/folders", async (req: Request, res: Response) => {
  try {
    const data = await getData();
    const folders = data.StartDepartment.MenuDepartment.map((folder: any) => processFolder(folder))

    res.json(folders)
  } catch (err) {
    res.status(500).send(err);
  }
})

export default router