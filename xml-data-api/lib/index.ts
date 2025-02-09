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

export const processFolder = (folder: any): any => {
  const subfolders = []

  if (Array.isArray(folder.TextArticle)) {
    subfolders.push(...folder.TextArticle.map((subfolder: any) => processFolder(subfolder)))
  }

  if (Array.isArray(folder.SubmenuDepartment)) {
    subfolders.push(...folder.SubmenuDepartment.map((subfolder: any) => {
      const processedSubfolder = processFolder(subfolder)
      if (Array.isArray(subfolder.TextArticle)) {
        processedSubfolder.subfolders.push(...subfolder.TextArticle.map((textArticle: any) => processFolder(textArticle)))
      }
      return processedSubfolder;
    }))
  }

  return {
    id: folder.$.id,
    title: folder.$.title,
    subfolders,
  }
}

export const collectArticles = (folder: any): any[] => {
  let articles = [];

  if (Array.isArray(folder.TextArticle)) {
    articles.push(...folder.TextArticle);
  }

  if (Array.isArray(folder.SubmenuDepartment)) {
    folder.SubmenuDepartment.forEach((subfolder: any) => {
      articles.push(...collectArticles(subfolder));
    });
  }

  return articles;
}