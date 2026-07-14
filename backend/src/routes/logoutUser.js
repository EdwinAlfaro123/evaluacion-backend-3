import express from "express"
import logoutUserController from "../controller/LogoutUserController.js"

const router = express.Router()

router.route("/")
.post(logoutUserController.logout)

export default router