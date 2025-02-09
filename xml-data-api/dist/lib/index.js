"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectArticles = exports.processFolder = exports.getData = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const xml2js_1 = require("xml2js");
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.resolve(__dirname, "../data.xml");
        const data = yield (0, promises_1.readFile)(filePath, "utf-8");
        const result = yield (0, xml2js_1.parseStringPromise)(data, {
            explicitArray: false
        });
        return result;
    }
    catch (err) {
        throw new Error(`Failed to fetch and parse articles: ${err.message}`);
    }
});
exports.getData = getData;
const processFolder = (folder) => {
    const subfolders = [];
    if (Array.isArray(folder.TextArticle)) {
        subfolders.push(...folder.TextArticle.map((subfolder) => (0, exports.processFolder)(subfolder)));
    }
    if (Array.isArray(folder.SubmenuDepartment)) {
        subfolders.push(...folder.SubmenuDepartment.map((subfolder) => {
            const processedSubfolder = (0, exports.processFolder)(subfolder);
            if (Array.isArray(subfolder.TextArticle)) {
                processedSubfolder.subfolders.push(...subfolder.TextArticle.map((textArticle) => (0, exports.processFolder)(textArticle)));
            }
            return processedSubfolder;
        }));
    }
    return {
        id: folder.$.id,
        title: folder.$.title,
        subfolders,
    };
};
exports.processFolder = processFolder;
const collectArticles = (folder) => {
    let articles = [];
    if (Array.isArray(folder.TextArticle)) {
        articles.push(...folder.TextArticle);
    }
    if (Array.isArray(folder.SubmenuDepartment)) {
        folder.SubmenuDepartment.forEach((subfolder) => {
            articles.push(...(0, exports.collectArticles)(subfolder));
        });
    }
    return articles;
};
exports.collectArticles = collectArticles;
