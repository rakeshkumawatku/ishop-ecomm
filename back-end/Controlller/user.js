const { response } = require("express");
const { encryptPassword, decryptPassword } = require("../helper");
const User = require("../model/user");
const Cart = require("../model/cart");


class userController {
    createAccount(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    if (data.name != "" && data.email != "" && data.password != "") {
                        if (data.password != data.confirm_password) {
                            reject({
                                msg: "Both password must match",
                                status: 0
                            })
                            return;
                        }
                        const userExists = await User.findOne({ email: data.email }).countDocuments();
                        if (userExists == 1) {
                            reject({
                                msg: "Email already exits",
                                status: 0
                            })
                        } else {
                            const users = new User({
                                name: data.name,
                                email: data.email,
                                password: encryptPassword(data.password)
                            })
                            users.save()
                                .then(
                                    (success) => {
                                        resolve({
                                            status: 1,
                                            msg: "User Created successfully",
                                            users
                                        })
                                    }
                                ).catch(
                                    (error) => {
                                        reject({
                                            msg: "Unable to create the account",
                                            status: 0,
                                        })
                                    }
                                )
                        }
                    } else {
                        reject({
                            status: 0,
                            msg: "please Enter all Data"
                        })
                    }


                } catch (error) {
                    console.log(error.message)
                    reject({
                        status: 0,
                        msg: "Internal server error"
                    })
                }
            }
        )
    }


    Read(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let UserData;
                    if (id != undefined) {
                        UserData = await User.findById(id)
                    } else {
                        UserData = await User.find()
                    }
                    resolve({
                        msg: "UserData found",
                        status: 1,
                        UserData

                    })
                } catch (error) {
                    reject({
                        msg: "Internal server error",
                        status: 0
                    })
                }


            }
        )
    }


    loginUser(data) {
        return new Promise(
            async (resolve, reject) => {
                const user = await User.findOne({ email: data.email })
                if (user) {
                    if (data.password == decryptPassword(user.password)) {
                        resolve({
                            msg: " User login successfully",
                            status: 1,
                            user

                        })
                    } else {
                        reject({
                            msg: "Incorrect password",
                            status: 0
                        })
                    }
                } else {
                    reject({
                        msg: "User note defind",
                        status: 0
                    })
                }
            }
        )
    }

    updateCart(user_id, { state_cart }) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    for (let c of state_cart) {
                        const cart = await Cart.findOne({ product_id: c.pId, user_id: user_id })
                        if (cart) {
                            await Cart.updateOne({ _id: cart._id }, { qty: cart.qty + c.qty })
                        } else {
                            await new Cart(
                                {
                                    user_id: user_id,
                                    product_id: c.pId,
                                    qty: c.qty
                                }
                            ).save();
                        }
                    }
                    const userCart = await Cart.find({ user_id: user_id }).populate("product_id");
                    resolve({
                        msg: "Cart updated",
                        status: 1,
                        userCart
                    })
                } catch (error) {
                    reject({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }



    changeCartQty(user_id, product_id, qty) {
        return new Promise(
            (resolve, reject) => {
                try {
                    if (qty == 0) {
                        Cart.deleteOne({ user_id: user_id, product_id: product_id })
                            .then(
                                (success) => {
                                    resolve({
                                        msg: "delete",
                                        status: 1
                                    })
                                }
                            ).catch(
                                (error) => {
                                    reject({
                                        msg: "Unable to delete",
                                        status: 0
                                    })
                                }
                            )
                    } else {
                        Cart.updateOne({ user_id: user_id, product_id: product_id }, { qty: qty })
                            .then(
                                (success) => {
                                    resolve({
                                        msg: "Update",
                                        status: 1
                                    })
                                }
                            ).catch(
                                (error) => {
                                    reject({
                                        msg: "Unable to Update",
                                        status: 0
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
    }

    loginafterAddProudsct(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const exitsCart = await Cart.findOne({ user_id: data.user_id, product_id: data.product_id })
                    if (exitsCart) {
                        Cart.updateOne({ _id: exitsCart._id }, { qty: exitsCart.qty + 1 })
                            .then(
                                (success) => {
                                    resolve({
                                        msg: "data updated",
                                        status: 1
                                    })
                                })
                            .catch((error) => {
                                reject({
                                    msg: "Unable to update",
                                    status: 0
                                })
                            })
                    } else {
                        const newCart = new Cart(data)
                        newCart.save()
                            .then((success) => {
                                resolve({
                                    msg: "data updated",
                                    status: 1
                                })
                            }).catch((error) => {
                                reject({
                                    msg: "Unable to update",
                                    status: 0
                                })
                            })
                    }
                } catch (error) {
                    reject({
                        msg: "Internal server error",
                        status: 0
                    })
                }

            }
        )
    }
}

module.exports = userController;