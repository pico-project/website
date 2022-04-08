import { Router } from "express"
import auth from "./auth.api"
import user from "./user.api"

const api = Router()

api.use("/auth", auth)

api.use("/user", user)

export default api