const logoutUserController = {}

logoutUserController.logout = async (req, res) => {
    try {
        res.clearCookie("authCookieUser")
        return res.status(200).json({message: "deslogueado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default logoutUserController