import express from "express"
import LoginUserController from "../controller/LoginUsuarioContoller.js"

const router = express.Router()

router.route("/")
.post(LoginUserController.login)

export default router