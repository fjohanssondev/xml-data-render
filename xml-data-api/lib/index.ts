import { parseStringPromise } from "xml2js";
import type { StartDepartment } from "../types";

export const baseURL = "https://api.bitbucket.org/2.0/repositories/fjohanssondev/xml-data-renderer/src/main/data"

export const getData = async () => {
  try {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: 'application/xml',
        Authorization: `Bearer ${process.env.BITBUCKET_AUTH_TOKEN}`,
      }
    })

    if (!response.ok) {
      throw new Error(`Error fetching articles: ${response.statusText}`)
    }

    const data = await response.text()
    const result = await parseStringPromise(data)

    return result.StartDepartment as StartDepartment

  } catch (err: any) {
    throw new Error(`Failed to fetch and parse articles: ${err.message}`)
  }
}