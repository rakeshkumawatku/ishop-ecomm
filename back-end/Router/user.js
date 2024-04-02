const express = require('express');
const userController = require('../Controlller/user');
const userRouter = express.Router();


userRouter.post(
    "/create-account",
    (req, res) => {
        new userController().createAccount(req.body)
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)


userRouter.post(
    "/login-user",
    (req, res) => {
        new userController().loginUser(req.body)
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

userRouter.get(
    "/:id?",
    (req, res) => {
        new userController().Read(req.params.id)
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

userRouter.post(
    "/update-user-cart/:user_id",
    (req, res) => {
        new userController().updateCart(req.params.user_id, req.body)
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

userRouter.get(
    "/change_Cart_qty/:user_id/:product_id/:qty",
    (req, res) => {
        new userController().changeCartQty(req.params.user_id, req.params.product_id, req.params.qty)
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)


userRouter.post(
    "/login-add-product",
    (req, res) => {
        new userController().loginafterAddProudsct(req.body)
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

module.exports = userRouter;