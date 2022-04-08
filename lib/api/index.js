"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_api_1 = __importDefault(require("./auth.api"));
const user_api_1 = __importDefault(require("./user.api"));
const api = (0, express_1.Router)();
api.use("/auth", auth_api_1.default);
api.use("/user", user_api_1.default);
exports.default = api;
