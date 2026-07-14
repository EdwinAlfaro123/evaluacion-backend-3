import express from "express"
import registerUserContoller from "../controller/RegisterUsuarioController.js"

const router = express.Router()

router.route("/")
.post(registerUserContoller.register)

router.route("/verifiCodeEmail")
.post(registerUserContoller.verify)

export default router