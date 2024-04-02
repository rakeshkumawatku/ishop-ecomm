const express = require("express");
const colorRouter = express.Router();
const ColorController = require("../Controlller/Color");
const CategoryRouter = require("./Category");


colorRouter.post(
    "/create",
    (req, res) => {
        new ColorController().post(req.body).then(
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

colorRouter.get(
    "/:id?",
    (req, res) => {
        new ColorController().read(req.params.id).then(
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

colorRouter.patch(
    "/update_status/:id/:new_status",
    (req, res) => {
        new ColorController().update(req.params.id, req.params.new_status).then(
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

colorRouter.delete(
    "/delete/:id",
    (req, res) => {
        new ColorController().delete(req.params.id).then(
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

colorRouter.put(
    "/edit/:id",
    (req, res) => {
        new ColorController().edit(req.params.id, req.body).then(
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


module.exports = colorRouter;