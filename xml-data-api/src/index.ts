import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import articles from "../routes/articles"
import folders from "../routes/folders"
import { getData } from "../lib"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(articles)
app.use(folders)

app.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getData()
    res.json({ message: "Polopoly's killer API is running", data: data.StartDepartment.MenuDepartment })
  } catch (err){
    res.status(500).send(err)
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})