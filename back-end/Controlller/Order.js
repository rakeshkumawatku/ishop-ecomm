const { razorpayInstance, verifyPayment } = require("../helper");
const Order = require("../model/Order");
const Cart = require("../model/cart");
const Transaction = require("../model/transaction");

class OrderController {
    create({ product_details, user_id, order_total, user_details }) {
        return new Promise(
            (resolve, reject) => {
                try {
                    const order = new Order({
                        product_details,
                        shipping_details: user_details,
                        order_total,
                        user_id,
                        order_payment_type: user_details.paymentMode
                    })
                    order.save().then(
                        (success) => {
                            Cart.deleteMany({ user_id: user_id })
                                .then(
                                    (success) => {
                                        if (user_details.paymentMode == 1) {
                                            resolve({
                                                msg: "Order Placed",
                                                status: 1,
                                                order_id: order._id
                                            })
                                        } else {
                                            const options = {
                                                amount: order_total * 100,  // amount in the smallest currency unit
                                                currency: "INR",
                                                receipt: order._id
                                            };
                                            razorpayInstance.orders.create(
                                                options,
                                                function (err, razorpayOrder) {
                                                    if (err) {
                                                        console.log(err, "err")
                                                        reject({
                                                            msg: "Unable to place order.",
                                                            status: 0
                                                        })
                                                    } else {
                                                        Order.updateOne({ _id: order._id }, { razorpay_order_id: razorpayOrder._id })
                                                            .then(
                                                                (success) => {
                                                                    resolve({
                                                                        msg: "Order placed",
                                                                        status: 1,
                                                                        order_id: order._id,
                                                                        razorpayOrder
                                                                    })
                                                                }
                                                            ).catch(
                                                                (error) => {
                                                                    console.log(error, "1")
                                                                    reject({
                                                                        msg: "Unable to place order.",
                                                                        status: 0
                                                                    })
                                                                }
                                                            )

                                                    }
                                                }
                                            );
                                        }
                                    }
                                ).catch(
                                    (error) => {

                                    }
                                )

                        }
                    ).catch(
                        (error) => {
                            console.log(error)
                            reject({
                                msg: "Unable to place Order",
                                status: 0
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
    }

    orderDetails(order_id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const order = await Order.findById(order_id)
                    resolve({
                        msg: 'Order Found',
                        order,
                        status: 1
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

    transactionHandler({ amount, razorpay_response, order_id }) {
        return new Promise(
            (resolve, reject) => {
                try {
                    if (razorpay_response.razorpay_signature) {
                        const vaild = verifyPayment(
                            razorpay_response.razorpay_order_id,
                            razorpay_response.razorpay_payment_id,
                            razorpay_response.razorpay_signature
                        )
                        if (vaild) {
                            const transaction = new Transaction({
                                order_id: order_id,
                                razorpay_order_id: razorpay_response.razorpay_order_id,
                                razorpay_payment_id: razorpay_response.razorpay_payment_id,
                                amount: amount / 100,
                                payment_status: true
                            })
                            transaction.save()
                                .then(
                                    (success) => {
                                        Order.updateOne({ _id: order_id },
                                            {
                                                razorpay_transaction_id: razorpay_response.razorpay_payment_id,
                                                transaction_id: transaction._id,
                                                order_status: 2
                                            }
                                        )
                                            .then(
                                                (success) => {
                                                    resolve({
                                                        msg: "Payment success",
                                                        status: 1,
                                                        order_id
                                                    })
                                                }
                                            ).catch(
                                                (error) => {
                                                    reject({
                                                        msg: "Internal server error",
                                                        status: 0
                                                    })
                                                }
                                            )
                                    }
                                ).catch(
                                    (error) => {
                                        reject({
                                            msg: "Internal server error",
                                            status: 0
                                        })
                                    }
                                )
                        } else {
                            reject({
                                msg: "payment transaction faild",
                                status: 0
                            })
                        }
                    } else {
                        const transaction = new Transaction({
                            order_id: order_id,
                            razorpay_order_id: razorpay_response.order_id,
                            razorpay_payment_id: razorpay_response.payment_id,
                            amount: amount / 100,
                            payment_status: false
                        })
                        transaction.save()
                            .then(
                                (success) => {
                                    Order.updateOne({ _id: order_id },
                                        {
                                            razorpay_transaction_id: razorpay_response.payment_id,
                                            transaction_id: transaction._id,
                                        }
                                    )
                                        .then(
                                            (success) => {
                                                resolve({
                                                    msg: "Payment faild",
                                                    status: 0,
                                                    order_id
                                                })
                                            }
                                        ).catch(
                                            (error) => {
                                                reject({
                                                    msg: "Internal server error",
                                                    status: 0
                                                })
                                            }
                                        )
                                }
                            ).catch(
                                (error) => {
                                    reject({
                                        msg: "Internal server error",
                                        status: 0
                                    })
                                }
                            )

                    }

                } catch (error) {

                }
            }
        )
    }

    readTransaction(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let data = [];
                    if (id) {
                        data = await Transaction.findById(id).populate("order_id")

                    } else {
                        data = await Transaction.find().populate("order_id")
                    }
                    resolve({
                        msg: "found Data",
                        status: 1,
                        data
                    })

                } catch (error) {
                    reject({
                        msg: "note found Data",
                        status: 0,
                    })
                }
            }
        )
    }


    readOrder(query) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const dbQuery = {};
                    if (query.order_id) {
                        dbQuery._id = query.order_id;
                    }
                    if (query.user_id) {
                        dbQuery.user_id = query.user_id
                    }
                    if (query.start && query.end) {
                        const StartDate = new Date(query.start)
                        const EndDate = new Date(query.end)
                        // dbQuery.CreatedAt = {
                        //     $gte: StartDate.toISOString(),
                        //     $lte: EndDate.toISOString()
                        // }
                    }

                    if (query.pricestart && query.priceend) {
                        dbQuery.order_total = {
                            $gte: query.pricestart,
                            $lte: query.priceend
                        }
                    }
                    const Order_data = await Order.find(dbQuery).populate("user_id")
                    resolve({
                        msg: "found Data",
                        status: 1,
                        Order_data
                    })

                } catch (error) {
                    reject({
                        msg: "note found Data",
                        status: 0,
                    })
                }
            }
        )
    }

    UpdateOrderStatus(order_id, new_status) {
        return new Promise(
            (resolve, reject) => {
                try {
                    Order.updateOne({ _id: order_id }, { order_status: new_status })
                        .then(
                            (success) => {
                                resolve({
                                    msg: "Order Status Update",
                                    status: 1,

                                })
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                                reject({
                                    msg: "Unable to Update Status",
                                    status: 0
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
    }

    fetchAllOrder(query) {
        return (
            new Promise(async (resolve, reject) => {
                try {
                    let data = [];
                    const DBquery = {}
                    if (query.order_id) {
                        if (query.user_id) {
                            DBquery._id = query.order_id,
                                DBquery.user_id = query.user_id
                        } else {
                            DBquery._id = query.order_id
                        }
                    }
                    const orderTime = await Order.find(DBquery).populate(['user_id', 'transaction_id']);
                    if (query.start != undefined && query.end != undefined) {
                        const startDate = (new Date(query.start).getDate());
                        const endDate = (new Date(query.end).getDate());
                        const startmonth = (new Date(query.start).getMonth());
                        const endmonth = (new Date(query.end).getMonth());
                        const startyear = (new Date(query.start).getFullYear());
                        const endyear = (new Date(query.end).getFullYear());

                        if (orderTime) {
                            for (const date of orderTime) {
                                console.log(date.createdAt.getMonth())
                                console.log(date.createdAt.getFullYear())
                                console.log(date.createdAt.getDate())

                                if (date.createdAt.getDate() >= startDate && date.createdAt.getDate() <= endDate) {
                                    if (date.createdAt.getMonth() >= startmonth && date.createdAt.getMonth() <= endmonth) {
                                        if (date.createdAt.getFullYear() >= startyear && date.createdAt.getFullYear() <= endyear) {
                                            data.push(date);
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        data = orderTime
                    }
                    resolve({
                        status: true,
                        message: Array.isArray(data) ? data.length + " data found" : "one data found",
                        data
                    })
                } catch (error) {
                    console.log(error)
                    reject({
                        status: false,
                        message: "Internal server error"
                    })
                }
            })
        )
    }


    AllToday() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const TodayOrder = [];
                    const orders = await Order.find()
                    if (orders) {
                        for (let data of orders) {
                            const lastdate = data.createdAt;
                            const today = new Date();

                            const GetMonth = lastdate.getMonth();
                            const GetYear = lastdate.getYear();
                            const GetDay = lastdate.getDate();
                            if (today.getDate() == GetDay && today.getMonth() == GetMonth && today.getYear() == GetYear) {
                                TodayOrder.push(data);
                            }
                        }
                        console.log(TodayOrder, "todayOrder")
                        resolve({
                            msg: "Today Orders",
                            status: 1,
                            TodayOrder
                        })
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
    }



}

module.exports = OrderController;