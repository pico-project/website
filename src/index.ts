import bodyParser from "body-parser"
import express from "express"
import { join } from "path"
import Session from "express-session"
import pgStore from "connect-pg-simple"
import api from "./api"
import clientScripts from "./client"

const PORT = process.env.PORT || 3400

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.set('trust proxy', 1)

app.set("views", join(__dirname, "../views"))

app.use(express.static(join(__dirname, "../public")))

let SessionStore = pgStore(Session)

let session = Session({
    secret: "Q9tfjtBUwhbvL6yR5vw6",
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 157788000000
    },
    store: new SessionStore({
        conString: "postgresql://postgres:daniel@ib.pico.com@db.mgagfxyjkutvmgdobsoe.supabase.co:5432/postgres"
    })
})

app.use(session)

app.use((req, _, next) => {
    if (!("data" in req.session)) {
        (req.session as any).data = { isSignIn: false, id: null }
    }
    next()
})

app.use("/api", api)

app.get("/", (req, res) => {
    let session:{isSignIn: false, id: null|string } = (req.session as any).data
    if (!session.isSignIn) {
        res.json({ message: "welcome" })
    } else {
        res.json({ message: "index" })
    }
})

app.listen(PORT, () => console.log(`Pico website app listening on port ${PORT}!`))