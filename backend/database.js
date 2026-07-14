import mongoose, { mongo } from "mongoose";
import {config} from "./config.js"

mongoose.connect(config.db.uri)

const connection = mongoose.connection

connection.on("open", () => {
    console.log("conectado")
})

connection.on("disconnected", () => {
    console.log("desconectado")
})

connection.on("error", (error) => {
    console.log("Error" + error)
})