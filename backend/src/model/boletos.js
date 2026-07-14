/*
● customerId
● quantity
● purchaseDate
● total
● paymentStatus
● transactionId
*/

import mongoose, {Schema, model} from "mongoose"

const boletoSchema = new Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: "usuario"},
    quantity: {type: Number},
    purchaseDate: {type: Date},
    total: {type: Number},
    paymentStatus: {type: String},
    transactionId: {type: String},
},{
    timestamps: true,
    strict: false
})

export default model("boletos", boletoSchema)