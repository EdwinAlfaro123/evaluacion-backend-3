import express from "express"
import BoletosController from "../controller/BoletosController.js"
import {validateAuthCookieAdmin, validateAuthCookieUser} from "../middleware/validateAuthCookie.js"

const router = express.Router()

router.route("/")
.get(validateAuthCookieAdmin(["admin"]), BoletosController.get)
.post(validateAuthCookieUser(["user"]), BoletosController.post)

router.route("/:id")
.put(validateAuthCookieAdmin(["admin"]),BoletosController.put)
.delete(validateAuthCookieAdmin(["admin"]),BoletosController.delete)
export default router

