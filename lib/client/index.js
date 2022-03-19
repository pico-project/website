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
const promises_1 = require("fs/promises");
const path_1 = require("path");
const clientScripts = (0, express_1.Router)();
clientScripts.get("/:script", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let clientScriptList = yield (0, promises_1.readdir)(__dirname);
    let clientScripts = new Set(clientScriptList);
    if (clientScripts.has(req.params.script) && req.params.script != "index.js") {
        res.sendFile((0, path_1.join)(__dirname, req.params.script));
    }
    else {
        res
            .status(404)
            .send();
    }
}));
exports.default = clientScripts;
