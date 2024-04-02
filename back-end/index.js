const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CategoryRouter = require('./Router/Category');
const colorRouter = require("./Router/color");
const productRouter = require("./Router/product");
const userRouter = require('./Router/user');
const OrderRouter = require('./Router/Order');
const AdminRouter = require('./Router/Admin');
const AmdinAuth = require('./middlewares/amdinAuth');
const PORT = 5000;


const app = express();
app.use(cors());
app.use(express.json());
app.use("/category", CategoryRouter);
app.use("/color", colorRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/order", OrderRouter);
app.use("/admin", AdminRouter);
app.use(express.static("public"))

mongoose.connect(
    "mongodb://localhost:27017",
    {
        dbName: "ishop-wsjp07"
    }
).then(
    (success) => {
        app.listen(PORT, () => console.log("server connected Successfully !"))
    }
).catch(
    (error) => {
        console.log(error)
        console.log('Unable to connect server')
    }
)