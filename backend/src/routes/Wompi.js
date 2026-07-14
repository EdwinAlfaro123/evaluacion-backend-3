import express from "express"
import WompiController from "../controller/wompiController.js"

const router = express.Router()

router.route("/token")
.post(WompiController.generarToken)

router.route("/PaymentTest")
.post(WompiController.PaymentTest)
export default router