import { Router } from "express"
import { readdir } from "fs/promises"
import { join } from "path"

const clientScripts = Router()

clientScripts.get("/:script", async (req, res) => {
    let clientScriptList = await readdir(__dirname)
    let clientScripts = new Set(clientScriptList)
    if (clientScripts.has(req.params.script) && req.params.script != "index.js") {
        res.sendFile(join(__dirname, req.params.script))
    } else {
        res
            .status(404)
            .send()
    }
})

export default clientScripts