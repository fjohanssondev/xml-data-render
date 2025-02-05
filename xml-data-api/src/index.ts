import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import articles from "../routes/articles"
import { getData } from "../lib"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(articles)

app.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getData()
    res.json(data)
  } catch (err){
    res.status(500).send(err)
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})