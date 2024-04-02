const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the schema
const orderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        order_total: {
            type: Number,
            required: true
        },
        shipping_details: {
            type: Object,
            required: true
        },
        product_details: {
            type: Array,
            required: true,
            default: null
        },
        transaction_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Transaction",
            default: null,
        },
        razorpay_order_id: {
            type: String, // Assuming razorpay_order is a string
        },
        razorpay_transaction_id: {
            type: String,
            default: null
        },
        order_payment_type: {
            type: Number,
            enum: [1, 2]
            //1:COD ,2:Online->razorpay
        },
        order_status: {
            type: String,
            enum: ['1', '2', '3', '4', '5', '6'],
            //1:Payment pending ,2:Payment Done (Oder Placed),3:Shipped,4: Delivered,5: Cancelled 6: Retrun 7: Refund
            default: 1
        }
    }, {
    timestamps: true
}
);

// Create a model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
