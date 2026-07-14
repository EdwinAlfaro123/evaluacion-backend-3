import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import {config} from "../../config.js"
import {json} from "express"
import UsuarioModel from "../model/usuario.js"

const LoginUserController = {}

LoginUserController.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const UserFound = await UsuarioModel.findOne({email})

        if(!UserFound){
            return res.status(400).json({message: "Not found"})
        }

        if(UserFound.timeOut && UserFound.timeOut > Date.now()){
            return res.status(403).json({message: "Blocked"})
        }

        const isMatch = await bcryptjs.compare(password, UserFound.password)

        if(!isMatch){
            UserFound.loginAttemps = (UserFound.loginAttemps || 0) + 1
            if(UserFound.loginAttemps >= 5){
                UserFound.timeOut = Date.now() + 5 * 60 * 1000
                UserFound.loginAttemps = 0
                await UserFound.save()
                return res.status(400).json({message: "Bloqueado"})
            }
            await UserFound.save()
            return res.status(401).json({message: "Incorrecta"})
        }
        UserFound.loginAttemps = 0
        UserFound.timeOut = null
        const token = jsonwebtoken.sign(
            {id: UserFound._id, userType: "user"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )
        res.cookie("authCookieUser", token)
        return res.status(200).json({message: "exito"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default LoginUserController