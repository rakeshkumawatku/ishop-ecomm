const mongoose = require("mongoose");
const { Schema } = mongoose;



const Colorschema = new Schema(
    {
        name: {
            type: String,
            maxlength: 50
        },
        color: {
            type: String,
            maxlength: 50
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

const color = mongoose.model("color", Colorschema);
module.exports = color;