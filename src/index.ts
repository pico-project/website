import bodyParser from "body-parser"
import express from "express"
import { join } from "path"

const PORT = process.env.PORT || 3400

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.set('trust proxy', 1)

app.set("views", join(__dirname, "../views"))

app.use(express.static(join(__dirname, "../public")))

app.get("/", (req, res) => res.send({ message: "Welcome to pico" }));

app.listen(PORT, () => console.log(`Pico website app listening on port ${PORT}!`))