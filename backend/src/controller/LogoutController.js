const logoutController = {}

logoutController.logout = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default logoutController