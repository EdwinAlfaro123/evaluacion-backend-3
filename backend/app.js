import express from "express"
import cookieParser from "cookie-parser"
import RegisterAdminRoutes from "./src/routes/RegisterAdmin.js"
import RegisterUserRoutes from "./src/routes/RegisterUsuario.js"
import LoginAdminRoutes from "./src/routes/LoginAdmin.js"
import LoginUserRoutes from "./src/routes/LoginUser.js"
import LogoutAdminRoutes from "./src/routes/logoutAdmin.js"
import WompiRoutes from "./src/routes/Wompi.js"
import BoletosRoutes from "./src/routes/Boletos.js"
import LogoutUserRoutes from "./src/routes/logoutUser.js"

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use("/api/RegisterAdmin", RegisterAdminRoutes)
app.use("/api/RegisterUser", RegisterUserRoutes)
app.use("/api/loginAdmin", LoginAdminRoutes)
app.use("/api/loginUser", LoginUserRoutes)
app.use("/api/logoutAdmin", LogoutAdminRoutes)
app.use("/api/logoutUser", LogoutUserRoutes)
app.use("/api/wompi", WompiRoutes)
app.use("/api/Boletos", BoletosRoutes)

export default app