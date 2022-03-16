"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const PORT = process.env.PORT || 3400;
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.set("views", (0, path_1.join)(__dirname, "../views"));
app.use(express_1.default.static((0, path_1.join)(__dirname, "../public")));
app.get("/", (req, res) => res.send({ message: "Welcome to pico" }));
app.listen(PORT, () => console.log(`Pico website app listening on port ${PORT}!`));
