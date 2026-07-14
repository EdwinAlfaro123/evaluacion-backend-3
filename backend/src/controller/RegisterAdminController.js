import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"
import adminModel from "../model/admin.js"
import {maxHeaderSize} from "http"
import {error} from "console"
import bcryptjs from "bcryptjs"

const registerAdminContoller = {}

registerAdminContoller.register = async (req, res) => {
    try {
        const {name, email, password, isVerified, timeOut} = req.body

        const existsAdmin = await adminModel.findOne({email})
        if(existsAdmin){
            return res.status(400).json({message: "usuario ya existente"})
        }

        const passwordHashed = await bcryptjs.hash(password, 10)
        const randomeCode = crypto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign({randomeCode, name, email, password: passwordHashed, isVerified, timeOut},
            config.JWT.secret,
            {expiresIn: "15m"}
        )

        res.cookie("registrationCookieAdmin", token, {maxAge: 15 * 60 * 1000})
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{user: config.email.user_email, pass: config.email.user_password}
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificacion",
            text: "Utiliza este codigo para registrarte " + randomeCode + " Expira en 15 minutos"
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Error sending"})
            }
            return res.status(200).json({message: "sent"})
        })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

registerAdminContoller.verify = async (req, res) => {
    try {
        const {verificationCodeRequest} = req.body
        const token = req.cookies.registrationCookieAdmin
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {randomeCode: storedCode, name, email, password, isVerified, loginAttemps, timeOut} = decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalido"})
        }

        const newAdmin = adminModel({name, email, password, isVerified: true})
        await newAdmin.save()
        res.clearCookie("registrationCookieAdmin")
        return res.status(200).json({message: "Registrado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default registerAdminContoller