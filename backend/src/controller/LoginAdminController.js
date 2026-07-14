import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import {config} from "../../config.js"
import {json} from "express"
import AdminModel from "../model/admin.js"

const LoginAdminController = {}

LoginAdminController.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const AdminFound = await AdminModel.findOne({email})

        if(!AdminFound){
            return res.status(400).json({message: "Not found"})
        }

        if(AdminFound.timeOut && AdminFound.timeOut > Date.now()){
            return res.status(403).json({message: "Blocked"})
        }

        const isMatch = await bcryptjs.compare(password, AdminFound.password)

        if(!isMatch){
            AdminFound.loginAttemps = (AdminFound.loginAttemps || 0) + 1
            if(AdminFound.loginAttemps >= 5){
                AdminFound.timeOut = Date.now() + 5 * 60 * 1000
                AdminFound.loginAttemps = 0
                await AdminFound.save()
                return res.status(400).json({message: "Bloqueado"})
            }
            await AdminFound.save()
            return res.status(401).json({message: "Incorrecta"})
        }
        AdminFound.loginAttemps = 0
        AdminFound.timeOut = null
        const token = jsonwebtoken.sign(
            {id: AdminFound._id, userType: "admin"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )
        res.cookie("authCookieAdmin", token)
        return res.status(200).json({message: "exito"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default LoginAdminController