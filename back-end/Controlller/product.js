const { getRendomNumber } = require("../helper");
const product = require("../model/product");
const Product = require("../model/product");
const Category = require('../model/Category');
const { unlinkSync } = require('fs');


class productController {
    create(data, image) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        const imageName = getRendomNumber(image.name);
                        const destination = "./public/images/product/" + imageName;
                        image.mv(
                            destination,
                            (err) => {
                                if (err) {
                                    reject({
                                        status: 0,
                                        msg: "Internal server error"
                                    })
                                } else {
                                    data.image = imageName;
                                    data.color = JSON.parse(data.color);
                                    const Data = new Product(data);
                                    Data.save()
                                        .then(
                                            (success) => {
                                                resolve({
                                                    status: 1,
                                                    msg: "data created successfully"
                                                })
                                            }
                                        ).catch(
                                            (error) => {
                                                reject({
                                                    status: 0,
                                                    msg: "Unable to the create data"
                                                })
                                            }
                                        )
                                }
                            })
                    } catch (error) {
                        reject({
                            msg: 'Internal server error',
                            status: 0
                        })
                    }
                }
            )
        )
    }

    read(id, query) {
        return (
            new Promise(
                async (resolve, reject) => {
                    try {
                        let data;
                        if (id != undefined) {
                            data = await product.findById(id).populate(["category", "color"]);
                        } else {
                            const category = await Category.findOne({ slug: query.category });
                            const filterQuery = {};
                            if (category != null) {
                                filterQuery.category = category._id;
                            }
                            if (query.color && query.color != "null") {
                                filterQuery.color = query.color
                            }
                            data = await Product.find(filterQuery).populate(['category', 'color']).limit(parseInt(query.limit));

                            // if (category != null) {
                            //     data = await product.find({ category: category._id }).populate(["category", "color"])
                            //         .limit(parseInt(query.limit));
                            // } else {
                            //     data = await product.find().populate(["category", "color"])
                            //         .limit(parseInt(query.limit));
                            // }
                        }
                        resolve({
                            status: 1,
                            msg: "data found",
                            data,
                            fileBaseUrl: "/images/product/"
                        })
                    } catch (error) {
                        reject({
                            msg: 'Internal server error',
                            status: 0
                        })
                    }
                }
            )
        )
    }

    delete(id) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        product.deleteOne({ _id: id }).then(
                            (success) => {
                                resolve({
                                    status: 1,
                                    msg: "data deleted successfully"
                                })
                            }
                        ).catch(
                            (error) => {
                                reject({
                                    status: 0,
                                    msg: "Unable to the delete data"
                                })
                            }
                        )
                    } catch (error) {
                        reject({
                            msg: 'Internal server error',
                            status: 0
                        })
                    }
                }
            )
        )
    }

    update(id, new_status) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        product.updateOne({ _id: id }, { status: new_status }).then(
                            (success) => {
                                resolve({
                                    status: 1,
                                    msg: "data updated successfully"
                                })
                            }
                        ).catch(
                            (error) => {
                                reject({
                                    status: 0,
                                    msg: "Unable to the update data"
                                })
                            }
                        )
                    } catch (error) {
                        reject({
                            msg: 'Internal server error',
                            status: 0
                        })
                    }
                }
            )
        )
    }

    edit(id, data, file) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        try {
                            if (file != undefined) {
                                const ImageName = getRendomNumber(file.name);
                                const Destination = "./public/images/product/" + ImageName;
                                file.mv(Destination, (err) => {
                                    if (err) {
                                        reject({
                                            status: 0,
                                            msg: 'Internal server error'
                                        })
                                    } else {
                                        data.image = ImageName;
                                        data.color = JSON.parse(data.color);
                                        product.updateOne({ _id: id }, {
                                            name: data.name,
                                            slug: data.slug,
                                            image: ImageName,
                                            discount: data.discount,
                                            price: data.price,
                                            discount_price: data.discount_price,
                                            color: data.color,
                                            category: data.category,
                                        }).then(
                                            (succes) => {
                                                unlinkSync("./public/images/product/" + data.oldImage);
                                                resolve({
                                                    status: 1,
                                                    msg: "data updated successfully"
                                                })
                                            }
                                        ).catch(
                                            (error) => {
                                                reject({
                                                    status: 0,
                                                    msg: "Unable to the update data"
                                                })
                                            }
                                        )
                                    }
                                })
                            } else {
                                data.color = JSON.parse(data.color)
                                product.updateOne({ _id: id }, {
                                    name: data.name,
                                    slug: data.slug,
                                    discount: data.discount,
                                    price: data.price,
                                    discount_price: data.discount_price,
                                    color: data.color,
                                    category: data.category,

                                }).then(
                                    (succes) => {
                                        resolve({
                                            status: 1,
                                            msg: "data updated successfully"
                                        })
                                    }
                                ).catch(
                                    (error) => {
                                        reject({
                                            status: 0,
                                            msg: "Unable to the update data"
                                        })
                                    }
                                )
                            }
                        } catch (error) {
                            reject({
                                msg: "Internal server error",
                                status: 0
                            })
                        }
                    } catch (error) {
                        reject({
                            msg: 'Internal server error',
                            status: 0
                        })
                    }
                }
            )
        )
    }
}

module.exports = productController;