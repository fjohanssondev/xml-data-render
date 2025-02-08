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
router.get("/folders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, lib_1.getData)();
        const folders = data.StartDepartment.MenuDepartment.map((folder) => ({
            id: folder.$.id,
            title: folder.$.title,
            subfolders: Array.isArray(folder.TextArticle)
                ? folder.TextArticle.map((subfolder) => {
                    var _a, _b;
                    return ({
                        id: ((_a = subfolder.$) === null || _a === void 0 ? void 0 : _a.id) || "???",
                        title: ((_b = subfolder.$) === null || _b === void 0 ? void 0 : _b.title) || "???",
                    });
                })
                : [],
        }));
        res.json(folders);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = router;
