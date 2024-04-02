const express = require('express');
const OrderController = require('../Controlller/Order');
const OrderRouter = express.Router();



OrderRouter.post(
    "/create-order",
    (req, res) => {
        new OrderController().create(req.body)
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

OrderRouter.get(
    "/order-details/:order_id",
    (req, res) => {
        new OrderController().orderDetails(req.params.order_id)
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

OrderRouter.post(
    "/order-transaction",
    (req, res) => {
        new OrderController().transactionHandler(req.body)
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

OrderRouter.get(
    "/read-transaction/:id?",
    (req, res) => {
        new OrderController().readTransaction(req.params.id)
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

OrderRouter.get(
    "/get-data",
    (req, res) => {
        new OrderController().readOrder(req.query)
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

OrderRouter.post(
    "/update-order-status/:order_id/:new_status",
    (req, res) => {
        new OrderController().UpdateOrderStatus(req.params.order_id, req.params.new_status)
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

OrderRouter.get(
    "/order-details",
    (req, res) => {
        new OrderController().fetchAllOrder(req.query)
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

OrderRouter.get(
    "/todayOrder",
    (req, res) => {
        new OrderController().AllToday()
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

module.exports = OrderRouter;