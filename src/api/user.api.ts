import { Router } from "express"
import supabase from "../utils/supabase"
import { Temporal } from "@js-temporal/polyfill"
import moment from "moment"

interface UserPostBodyData {
    email?: string
    birthday?: string
    first_name?: string
    last_name?: string
    password?: string   
}

const user = Router()

user.delete("/:id", async (req, res) => {
    let id = req.params.id
    const deleteUserData = await supabase
        .from("users")
        .delete()
        .match({ id })
    if (!deleteUserData.error) {
        const { error } = await supabase.auth.api.deleteUser(id)
        if (!error) {
            (req.session as any).data = { isSignIn: false, id: null }
            res
                .status(200)
                .json({ status: 200 })
        } else {
            res
                .status(400)
                .json({ status: 400, message: (error as any).message })
        }
    } else {
        res
            .status(400)
            .json({ status: 400, message: (deleteUserData.error as any).message })
    }
})

user.post("/:id", async (req, res) => {
    let isEmailUpdater = true
    let id = req.params.id
    let body = req.body as UserPostBodyData
    let userUpdateObject: { [name:string]: any } = {}
    userUpdateObject["user_metadata"] = {}
    if (body.email) {
        userUpdateObject["email"] = body.email
        const emailDebugger = await supabase
            .from("users")
            .select("id")
            .eq("email", body.email)
        
        if (emailDebugger.data) {
            let emailDebuggerData = emailDebugger.data
            if (emailDebuggerData.length == 1)
                emailDebuggerData[0].id != id ? isEmailUpdater = false : void 0
        }
    }
    if (body.password) {
        userUpdateObject["password"] = body.password
        userUpdateObject["user_metadata"]["password"] = body.password
    }
    body.first_name ? userUpdateObject["user_metadata"]["first_name"] = body.first_name : void 0
    body.last_name ? userUpdateObject["user_metadata"]["last_name"] = body.last_name : void 0
    body.birthday ? (userUpdateObject["user_metadata"]["birthday"] = body.birthday) : void 0
    if (!isEmailUpdater) {
        delete userUpdateObject["email"]
    }
    
    const { data, error } = await supabase.auth.api.updateUserById(
        id,
        { ...userUpdateObject }
    )
    if (data) {
        if (!isEmailUpdater) {
            res
                .status(400)
                .json({ status: 400, data: body, message: "Email already used by another user" })
        } else {
            res
                .status(200)
                .json({ status: 200, data: body })
        }
        
    } else {
        res
            .status(400)
            .json({ status: 400, message: (error as any).message })
    }
})

user.get("/:id", async (req, res) => {
    let id  = req.params.id
    const { data, error } = await supabase
        .from("users")
        .select("email, first_name, last_name, birthday, created_at, password, country")
        .eq("id", id)
        .limit(1)
    if (data) {
        if (data.length > 0) {
            let dataObj = data.at(0)
            let created_at = Temporal.PlainDateTime.from(dataObj["created_at"])
            let birthday = Temporal.PlainDateTime.from(dataObj["birthday"])
            let created_at_formant = moment(created_at.toString()).format("LL")
            let birthday_formant = moment(birthday.toString()).format("LL")
            res
                .status(200)
                .json({ status: 200, data: {...dataObj, created_at: created_at_formant, birthday: birthday_formant} })
        } else {
            res
                .status(400)
                .json({ status: 400, message: "User not found" })
        }
        
    } else {
        res
            .status(400)
            .json({ status: 400, message: (error as any).message })
    }
})

export default user