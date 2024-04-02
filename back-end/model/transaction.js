const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Order",
            required: true
        },
        amout: {
            type: Number
        },
        razorpay_order_id: {
            type: String,
            required: true
        },
        razorpay_payment_id: {
            type: String,
            required: true
        },
        payment_status: {
            type: Boolean,
            required: true,
            default: false // Assuming default status is false, change if needed
        }
    },
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;