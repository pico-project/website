import { Router } from "express"
import supabase from "../utils/supabase"

const auth = Router()

interface SignUpApiBodyData {
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: string
}

auth.post("/verify/:access_token",  async (req, res) => {
    let { user, error } = await supabase.auth.api.getUser(req.params.access_token)
    if (error) {
        res
            .status(400)
            .json({ status: 400, message: error.message })
    } else {
        if (user) {
            (req.session as any).data = { isSignIn: true, id: user.id }
            res
                .status(200)
                .json({ status: 200 })
        } else {
            res
                .status(400)
                .json({ status: 400, message: "Invalided token" })
        }
    }
})

auth.post("/signin", async (req, res) => {
    let { email, password } = req.body as { email: string, password: string }
    let { user, error } = await supabase.auth.signIn( { email, password } )
    if (error) {
        res
            .status(400)
            .json({ status: 400, message: error.message })
    } else {
        if (user) {
            (req.session as any).data = { isSignIn: true, id: user.id }
            res
                .status(200)
                .json({ status: 200 })
        } else {
            res
                .status(400)
                .json({ status: 400, message: "Invalid login credentials" })
        }
    }
})

auth.post("/forget_password", async (req, res) => {
    let { email } = req.body as { email: string }
    let { error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) {
        res
            .status(400)
            .json({ status: 400, message: error.message })
    } else {
        res
            .status(200)
            .json({ status: 200 })
    }
})

auth.get("/logout", (req, res) => {
    (req.session as any).data = { isSignIn: false, id: null }
    res.redirect("/")
})

auth.post("/signup", async (req, res) => {
    let {
        email,
        password,
        firstName,
        lastName,
        birthday
    } = req.body as  SignUpApiBodyData
    const userData = await supabase
        .from("users")
        .select("email_confirmed_at")
        .eq("email", email)
        .limit(1)
        .single()
    if (userData.error == null || userData.error == undefined) {
        if (userData.data["email_confirmed_at"] != null) {
            res
                .status(400)
                .json({ status: 400, message: "User exist" })
        } else {
            res
                .status(200)
                .json({ status: 200, message: "Waiting for verification" })
        }
    } else {
        const { error } = await supabase.auth.signUp({ email, password }, { data: { "first_name": firstName, "last_name": lastName, birthday } })
        if (error != null || error != undefined) {
            res
                .status(400)
                .json({ status: 400, message: error.message })
        } else {
            res
                .status(200)
                .json({ status: 200, message: "Waiting for verification" })
        }
    }
})

export default auth