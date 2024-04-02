const express = require('express');
const productRouter = express.Router();
const productController = require("../Controlller/product");
const fileUpload = require('express-fileupload');


productRouter.post(
    "/create",
    fileUpload({
        "createParentPath": true
    }),
    (req, res) => {
        const data = req.body;
        const image = req.files.image;
        new productController().create(data, image).then(
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

productRouter.get(
    "/:id?",
    (req, res) => {
        new productController().read(req.params.id, req.query).then(
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


productRouter.delete(
    "/delete/:id",
    (req, res) => {
        new productController().delete(req.params.id).then(
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

productRouter.patch(
    "/update/:id/:new_status",
    (req, res) => {
        new productController().update(req.params.id, req.params.new_status).then(
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


productRouter.put(
    "/edit/:id",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        new productController().edit(req.params.id, req.body, req.files?.image).then(
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

module.exports = productRouter;