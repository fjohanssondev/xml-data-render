import path from "path";
import { readFile } from "fs/promises";
import { parseStringPromise } from "xml2js";

export const getData = async () => {
  try {
    const filePath = path.resolve(__dirname, "../data.xml")
    const data = await readFile(filePath, "utf-8")
    const result = await parseStringPromise(data, {
      explicitArray: false
    })

    return result;

  } catch (err: any) {
    throw new Error(`Failed to fetch and parse articles: ${err.message}`)
  }
}