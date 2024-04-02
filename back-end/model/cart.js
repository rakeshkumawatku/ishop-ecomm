const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        product_id: {
            type: mongoose.Schema.ObjectId,
            ref: "product"
        },
        qty: {
            type: Number,
            default: 1
        }
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;