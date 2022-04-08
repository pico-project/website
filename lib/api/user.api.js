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
const polyfill_1 = require("@js-temporal/polyfill");
const moment_1 = __importDefault(require("moment"));
const user = (0, express_1.Router)();
user.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const deleteUserData = yield supabase_1.default
        .from("users")
        .delete()
        .match({ id });
    if (!deleteUserData.error) {
        const { error } = yield supabase_1.default.auth.api.deleteUser(id);
        if (!error) {
            req.session.data = { isSignIn: false, id: null };
            res
                .status(200)
                .json({ status: 200 });
        }
        else {
            res
                .status(400)
                .json({ status: 400, message: error.message });
        }
    }
    else {
        res
            .status(400)
            .json({ status: 400, message: deleteUserData.error.message });
    }
}));
user.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isEmailUpdater = true;
    let id = req.params.id;
    let body = req.body;
    let userUpdateObject = {};
    userUpdateObject["user_metadata"] = {};
    if (body.email) {
        userUpdateObject["email"] = body.email;
        const emailDebugger = yield supabase_1.default
            .from("users")
            .select("id")
            .eq("email", body.email);
        if (emailDebugger.data) {
            let emailDebuggerData = emailDebugger.data;
            if (emailDebuggerData.length == 1)
                emailDebuggerData[0].id != id ? isEmailUpdater = false : void 0;
        }
    }
    if (body.password) {
        userUpdateObject["password"] = body.password;
        userUpdateObject["user_metadata"]["password"] = body.password;
    }
    body.first_name ? userUpdateObject["user_metadata"]["first_name"] = body.first_name : void 0;
    body.last_name ? userUpdateObject["user_metadata"]["last_name"] = body.last_name : void 0;
    body.birthday ? (userUpdateObject["user_metadata"]["birthday"] = body.birthday) : void 0;
    if (!isEmailUpdater) {
        delete userUpdateObject["email"];
    }
    const { data, error } = yield supabase_1.default.auth.api.updateUserById(id, Object.assign({}, userUpdateObject));
    if (data) {
        if (!isEmailUpdater) {
            res
                .status(400)
                .json({ status: 400, data: body, message: "Email already used by another user" });
        }
        else {
            res
                .status(200)
                .json({ status: 200, data: body });
        }
    }
    else {
        res
            .status(400)
            .json({ status: 400, message: error.message });
    }
}));
user.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const { data, error } = yield supabase_1.default
        .from("users")
        .select("email, first_name, last_name, birthday, created_at, password, country")
        .eq("id", id)
        .limit(1);
    if (data) {
        if (data.length > 0) {
            let dataObj = data.at(0);
            let created_at = polyfill_1.Temporal.PlainDateTime.from(dataObj["created_at"]);
            let birthday = polyfill_1.Temporal.PlainDateTime.from(dataObj["birthday"]);
            let created_at_formant = (0, moment_1.default)(created_at.toString()).format("LL");
            let birthday_formant = (0, moment_1.default)(birthday.toString()).format("LL");
            res
                .status(200)
                .json({ status: 200, data: Object.assign(Object.assign({}, dataObj), { created_at: created_at_formant, birthday: birthday_formant }) });
        }
        else {
            res
                .status(400)
                .json({ status: 400, message: "User not found" });
        }
    }
    else {
        res
            .status(400)
            .json({ status: 400, message: error.message });
    }
}));
exports.default = user;
