const mongoose = require('mongoose');
const { Schema } = mongoose;


const Productschema = new Schema(
    {
        name: {
            type: String,
            maxLength: 50
        },
        slug: {
            type: String,
            maxLength: 50
        },
        price: {
            type: Number,
            min: 1
        },
        discount_price: {
            type: Number,
            min: 1
        },
        discunt_percent: {
            type: Number,
        },
        image: {
            type: String,
            maxLength: 100
        },
        status: {
            type: Boolean,
            default: true
        },
        color: [
            {
                type: Schema.ObjectId,
                ref: "color"
            }
        ],
        category: {
            type: Schema.ObjectId,
            ref: "Category"

        },
        stock: {
            type: Boolean,
            default: true
        },
        deleted_at: {
            type: Number,
            default: 0
        }
    }, {
    timestamps: true
}
)

const product = mongoose.model("product", Productschema);

module.exports = product;