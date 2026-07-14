/*
● name
● email
● password
● isVerified
● loginAttempts
● timeOut
*/

import {Schema, model} from "mongoose"

const usuarioSchema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    isVerified: {type: String},
    loginAttemps: {type: String},
    timeOut: {type: String},
},{
    timestamps: true,
    strict: false
})

export default model("usuario", usuarioSchema)