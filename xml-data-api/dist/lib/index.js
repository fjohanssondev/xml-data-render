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
exports.getData = exports.baseURL = void 0;
const xml2js_1 = require("xml2js");
exports.baseURL = "https://api.bitbucket.org/2.0/repositories/fjohanssondev/xml-data-renderer/src/main/data";
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(exports.baseURL, {
            method: "GET",
            headers: {
                Accept: 'application/xml',
                Authorization: `Bearer ${process.env.BITBUCKET_AUTH_TOKEN}`,
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching articles: ${response.statusText}`);
        }
        const data = yield response.text();
        const result = yield (0, xml2js_1.parseStringPromise)(data);
        return result.StartDepartment;
    }
    catch (err) {
        throw new Error(`Failed to fetch and parse articles: ${err.message}`);
    }
});
exports.getData = getData;
