import express from "express"

const PORT = process.env.PORT || 3400

const app = express()

app.get("/", (req, res) => res.send({ message: "Welcome to pico" }));

app.listen(PORT, () => console.log(`Pico website app listening on port ${PORT}!`))