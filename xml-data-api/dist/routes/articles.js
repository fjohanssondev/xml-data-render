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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lib_1 = require("../lib");
const router = (0, express_1.Router)();
router.get("/articles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, lib_1.getData)();
        const allArticles = data.StartDepartment.MenuDepartment.flatMap((folder) => Array.isArray(folder.TextArticle) ? folder.TextArticle : []);
        const article = allArticles.find((article) => { var _a; return ((_a = article.$) === null || _a === void 0 ? void 0 : _a.id) === req.params.id; });
        if (!article) {
            res.status(404).send({ message: "Article not found" });
        }
        res.json(article);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = router;
