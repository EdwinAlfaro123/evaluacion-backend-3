import express from "express"
import LoginAdminController from "../controller/LoginAdminController.js"

const router = express.Router()

router.route("/")
.post(LoginAdminController.login)

export default router