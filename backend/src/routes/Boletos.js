import express from "express"
import BoletosController from "../controller/BoletosController.js"
import {validateAuthCookie} from "../middleware/validateAuthCookie.js"

const router = express.Router()

router.route("/")
.get(validateAuthCookie(["user"]), BoletosController.get)
.post(validateAuthCookie(["user"]), BoletosController.post)

router.route("/:id")
.put(validateAuthCookie(["admin"]),BoletosController.put)
.delete(validateAuthCookie(["admin"]),BoletosController.delete)
export default router