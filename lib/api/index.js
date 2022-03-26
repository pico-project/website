"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_api_1 = __importDefault(require("./auth.api"));
const api = (0, express_1.Router)();
api.use("/auth", auth_api_1.default);
api.get("/", (_, res) => res.send("hello"));
exports.default = api;
