const Category = require('../model/Category')
const {getRendomNumber} = require('../helper');
const { unlinkSync } = require('fs');
const product = require('../model/product');
class categorycontroller {
    create(data, image) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        const imageName = getRendomNumber(image.name);
                        const destination = "./public/images/category/" + imageName;
                        image.mv(
                            destination,
                            (err) => {
                                if (err) {
                                    reject({
                                        msg: "Internal server error",
                                        status: 0
                                    })
                                } else {
                                    data.image = imageName;
                                    const cat = new Category(data);
                                    cat.save()
                                        .then(
                                            (success) => {
                                                resolve({
                                                    msg: 'data created successfully',
                                                    status: 1
                                                })
                                            }
                                        ).catch(
                                            (error) => {
                                                reject({
                                                    msg: "Unable to  create Data",
                                                    status: 0
                                                })
                                            }
                                        )
                                }
                            }
                        )
                    } catch (error) {
                        reject({
                            msg: "Internal server error",
                            status: 0
                        })
                    }
                }
            )
        )
    }

    read(id) {
        return (
            new Promise(
                async (resolve, reject) => {
                    try {
                        let data;
                        let finalData = [];
                        if (id != undefined) {
                            data = await Category.findById(id)
                            finalData = data;
                        } else {
                            data = await Category.find()
                            for (let d of data) {
                                const count = await product.find({ category: d._id }).countDocuments();
                                finalData.push({
                                    ...d.toJSON(),
                                    count
                                })
                            }
                        }

                        resolve({
                            msg: "Data found",
                            status: 1,
                            data: finalData,
                            fileBaseUrl: "/images/category/"
                        })

                    } catch (error) {
                        reject({
                            msg: "Internal server error",
                            status: 0
                        })
                    }
                }
            )
        )
    }

    updateStatus(id, new_status) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        Category.updateOne({ _id: id }, { status: new_status }).then(
                            (succse) => {

                                resolve({
                                    status: 1,
                                    msg: 'status change successfully'
                                })
                            }
                        ).catch(
                            (error) => {

                                reject({
                                    status: 0,
                                    msg: "Unable to The delete Data "
                                })
                            }
                        )

                    } catch (error) {
                        reject({
                            msg: "Internal server error",
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
                        if (file != undefined) {
                            const ImageName = getRendomNumber(file.name);
                            const Destination = "./public/images/category/" + ImageName;
                            file.mv(Destination, (err) => {
                                if (err) {
                                    reject({
                                        status: 0,
                                        msg: 'Internal server error'
                                    })
                                } else {
                                    data.image = ImageName;
                                    Category.updateOne({ _id: id }, { name: data.name, slug: data.slug, image: ImageName }).then(
                                        (succes) => {
                                            unlinkSync("./public/images/category/" + data.oldImage);
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
                            Category.updateOne({ _id: id }, { name: data.name, slug: data.slug }).then(
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
                        console.log(error)
                        reject({
                            msg: "Internal server error",
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
                async (resolve, reject) => {
                    try {
                        const productCount = await product.find({ category: id }).countDocuments();
                        if (productCount != 0) {
                            reject({
                                msg: "connot delete category having product"
                            });
                            return;
                        }
                        const olddata = await Category.findById(id);
                        if (olddata != null) {
                            Category.deleteOne({ _id: id }).then(
                                (success) => {
                                    let imgpath = olddata.image;
                                    unlinkSync(`./public/images/category/${imgpath}`);
                                    resolve({
                                        status: 1,
                                        msg: 'Data deleted successfully'
                                    })
                                }
                            ).catch(
                                (error) => {
                                    res.send({
                                        statust: 0,
                                        msg: 'data note deleted'
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
                }
            )
        )
    }
}

module.exports = categorycontroller;