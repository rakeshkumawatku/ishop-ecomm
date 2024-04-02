const express = require('express');
const categorycontroller = require('../Controlller/category');
const CategoryRouter = express.Router();
const fileUpload = require('express-fileupload');



CategoryRouter.post(
    "/create",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const data = req.body;
        const image = req.files.image;
        new categorycontroller().create(data, image).then(
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

CategoryRouter.get(
    "/:id?",
    (req, res) => {
        new categorycontroller().read(req.params.id).then(
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

CategoryRouter.delete(
    "/delete/:id",
    (req, res) => {
        new categorycontroller().delete(req.params.id).then(
            (succes) => {
                res.send(succes)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

CategoryRouter.patch(
    "/update/:id/:new_status",
    (req, res) => {
        new categorycontroller().updateStatus(req.params.id, req.params.new_status).then(
            (succes) => {
                res.send(succes)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

CategoryRouter.put(
    "/UpdateData/:id",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        new categorycontroller().edit(req.params.id, req.body, req.files?.image).then(
            (succes) => {
                res.send(succes)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

module.exports = CategoryRouter;
