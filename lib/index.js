"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const api_1 = __importDefault(require("./api"));
const client_1 = __importDefault(require("./client"));
const PORT = process.env.PORT || 3400;
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.set("views", (0, path_1.join)(__dirname, "../views"));
app.use(express_1.default.static((0, path_1.join)(__dirname, "../public")));
let SessionStore = (0, connect_pg_simple_1.default)(express_session_1.default);
let session = (0, express_session_1.default)({
    secret: "Q9tfjtBUwhbvL6yR5vw6",
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 157788000000
    },
    store: new SessionStore({
        conString: "postgresql://postgres:daniel@ib.pico.com@db.mgagfxyjkutvmgdobsoe.supabase.co:5432/postgres"
    })
});
app.use(session);
app.use((req, _, next) => {
    if (!("data" in req.session)) {
        req.session.data = { isSignIn: false, id: null };
    }
    next();
});
app.use("/client", client_1.default);
app.use("/api", api_1.default);
app.get("/", (req, res) => {
    let session = req.session.data;
    if (!session.isSignIn) {
        res.json({ message: "welcome" });
    }
    else {
        res.json({ message: "index" });
    }
});
app.listen(PORT, () => console.log(`Pico website app listening on port ${PORT}!`));
