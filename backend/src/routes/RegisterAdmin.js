import express from "express"
import registerAdminContoller from "../controller/RegisterAdminController.js"

const router = express.Router()

router.route("/")
.post(registerAdminContoller.register)

router.route("/verifiCodeEmail")
.post(registerAdminContoller.verify)

export default router