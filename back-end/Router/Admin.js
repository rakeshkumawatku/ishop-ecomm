const express = require('express');
const AdminController = require('../Controlller/Admin');
const AdminRouter = express.Router();





AdminRouter.post(
    "/login",
    (req, res) => {
        new AdminController().login(req.body)
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

module.exports = AdminRouter;