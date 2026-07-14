import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"

export const validateAuthCookieAdmin = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            const {authCookieAdmin} = req.cookies
            if(!authCookieAdmin){
                return res.status(403).json({message: "Auth"})
            }
            const decoded = jsonwebtoken.verify(authCookieAdmin, config.JWT.secret)
            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "denegado"})
            }

            next()
        } catch (error) {
            console.log("error" + error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

export const validateAuthCookieUser = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            const {authCookieUser} = req.cookies
            if(!authCookieUser){
                return res.status(403).json({message: "Auth"})
            }
            const decoded = jsonwebtoken.verify(authCookieUser, config.JWT.secret)
            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "denegado"})
            }

            next()
        } catch (error) {
            console.log("error" + error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}