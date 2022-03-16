"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3400;
const app = (0, express_1.default)();
app.get("/", (req, res) => res.send({ message: "Welcome to pico" }));
app.listen(PORT, () => console.log(`Pico website app listening on port ${PORT}!`));
