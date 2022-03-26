"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = __importDefault(require("../utils/supabase"));
const auth = (0, express_1.Router)();
auth.post("/verify/:access_token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, error } = yield supabase_1.default.auth.api.getUser(req.params.access_token);
    if (error) {
        res
            .status(400)
            .json({ status: 400, message: error.message });
    }
    else {
        if (user) {
            req.session.data = { isSignIn: true, id: user.id };
            res
                .status(200)
                .json({ status: 200 });
        }
        else {
            res
                .status(400)
                .json({ status: 400, message: "Invalided token" });
        }
    }
}));
auth.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    let { user, error } = yield supabase_1.default.auth.signIn({ email, password });
    if (error) {
        res
            .status(400)
            .json({ status: 400, message: error.message });
    }
    else {
        if (user) {
            req.session.data = { isSignIn: true, id: user.id };
            res
                .status(200)
                .json({ status: 200 });
        }
        else {
            res
                .status(400)
                .json({ status: 400, message: "Invalid login credentials" });
        }
    }
}));
auth.post("/forget_password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email } = req.body;
    let { error } = yield supabase_1.default.auth.api.resetPasswordForEmail(email);
    if (error) {
        res
            .status(400)
            .json({ status: 400, message: error.message });
    }
    else {
        res
            .status(200)
            .json({ status: 200 });
    }
}));
auth.get("/logout", (req, res) => {
    req.session.data = { isSignIn: false, id: null };
    res.redirect("/");
});
auth.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password, firstName, lastName, birthday, country } = req.body;
    country = country.toLowerCase();
    const userData = yield supabase_1.default
        .from("users")
        .select("email_confirmed_at")
        .eq("email", email)
        .limit(1)
        .single();
    if (userData.error == null || userData.error == undefined) {
        if (userData.data["email_confirmed_at"] != null) {
            res
                .status(400)
                .json({ status: 400, message: "User exist" });
        }
        else {
            res
                .status(200)
                .json({ status: 200, message: "Waiting for verification" });
        }
    }
    else {
        const { error } = yield supabase_1.default.auth.signUp({ email, password }, { data: { "first_name": firstName, "last_name": lastName, birthday, country } });
        if (error != null || error != undefined) {
            res
                .status(400)
                .json({ status: 400, message: error.message });
        }
        else {
            res
                .status(200)
                .json({ status: 200, message: "Waiting for verification" });
        }
    }
}));
exports.default = auth;
