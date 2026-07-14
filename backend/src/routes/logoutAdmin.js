import express from "express"
import logoutAdminController from "../controller/LogoutAdminController.js"

const router = express.Router()

router.route("/")
.post(logoutAdminController.logout)

export default router