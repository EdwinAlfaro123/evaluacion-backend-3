import BoletosModel from "../model/boletos.js"

const BoletosController = {}

BoletosController.get = async (req, res) => {
    try {
        const boletos = await BoletosModel.find()
        return res.status(200).json(boletos)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

BoletosController.post = async (req, res) => {
    try {
        const {customerId, quantity, purchaseDate, total, paymentStatus, transactionId} = req.body
        const newBoleto = new BoletosModel({customerId, quantity, purchaseDate, total, paymentStatus, transactionId})
        await newBoleto.save()
        return res.status(200).json({message: "Insertado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

BoletosController.put = async (req, res) => {
    try {
        const {customerId, quantity, purchaseDate, total, paymentStatus, transactionId} = req.body
        const updatedBoleto = await BoletosModel.findByIdAndUpdate(req.params.id,{
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        },{
            new: true
        })

        if(!updatedBoleto){
            return res.status(404).json({message: "Not found"})
        }
        return res.status(200).json({message: "Actualizado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

BoletosController.delete = async (req, res) => {
    try {
        const deletedBoleto = await BoletosModel.findByIdAndDelete(req.params.id)
        if(!deletedBoleto){
            return res.status(404).json({message: "Not found"})
        }
        return res.status(200).json({message: "Eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default BoletosController