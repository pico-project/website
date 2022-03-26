import { Router } from "express"
import auth from "./auth.api"

const api = Router()

api.use("/auth", auth)

api.get("/", (_, res) => res.send("hello"))

export default api