const mongoose = require('mongoose');
const { Schema } = mongoose;


const Categoryschema = new Schema(
    {
        name: {
            type: String,
            maxLength: 50
        },
        slug: {
            type: String,
            maxLength: 50
        },
        image: {
            type: String,
            maxLength: 100
        },
        status: {
            type: Boolean,
            default: true
        }
    }, {

    timestamps: true
}
)

const Category = mongoose.model("Category", Categoryschema);

module.exports = Category;