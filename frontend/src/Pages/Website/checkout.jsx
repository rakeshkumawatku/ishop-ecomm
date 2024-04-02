import React, { useContext, useEffect, useState } from 'react';
import Container from '../../Components/Website/Container';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MainContext } from '../../MainContext';
import { changeQty, emptyCart } from '../../Reduser/cart';
import axios from 'axios';
import useRazorpay from "react-razorpay";

const Checkout = () => {
    const [Razorpay] = useRazorpay();
    const dispatcher = useDispatch();
    const { products, apiBaseUrl, productImgUrl, notify, apiUserUrl, apiOrderUrl } = useContext(MainContext);
    const data = useSelector(store => store.cart.data)
    const user = useSelector(store => store.user)
    const cart = useSelector((store) => { return store.cart })
    const [userData, setUserData] = useState(null);
    const navigator = useNavigate();

    useEffect(
        () => {
            setUserData({
                name: user.data?.name,
                email: user.data?.email,
                contact: user.data?.contact,
                address: user.data?.address,
                pincode: user.data?.pincode,
                paymentMode: 2
            })
        }, [user]
    )

    const changeCartqty = (pId, qty) => {
        if (user.data != null) {
            axios.get(apiBaseUrl + apiUserUrl + "/change_Cart_qty/" + user.data._id + "/" + pId + "/" + qty)
                .then(() => { }).catch(() => { })
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        //userData
        const order_total = cart.total + (userData.paymentMode == 1 ? 50 : 0)
        const product_details = [];
        for (let p of products) {
            const found = data.find(i => i.pId == p._id)
            if (found) {
                product_details.push(
                    {
                        discount_price: p.discount_price,
                        name: p.name,
                        image: p.image,
                        slug: p.slug,
                        ...found
                    }
                )
            }
        }

        const datas = {
            user_details: userData,
            product_details,
            order_total,
            user_id: user.data._id
        }

        axios.post(apiBaseUrl + apiOrderUrl + "/create-order/", datas)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        if (userData.paymentMode == 1) {
                            navigator(`/order-summary/${success.data.order_id}`);
                            dispatcher(emptyCart())
                        } else {
                            PaymentPopUp(success.data.order_id, success.data.razorpayOrder)
                        }
                    } else {

                    }
                }
            ).catch(
                (error) => {

                }
            )

    }


    const PaymentPopUp = (order_id, razorpayOrder) => {
        const options = {
            // key: "rzp_test_bDLKmM81FAxF1y", // Enter the Key ID generated from the Dashboard //
            key_id: "rzp_test_Ir0Q50gcWll5wv",
            amount: razorpayOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Ws Cube",
            description: "UpSkillingIndia",
            image: "https://www.wscubetech.com/images/wscube-tech-logo.svg",
            order_id: razorpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                axios.post(apiBaseUrl + apiOrderUrl + "/order-transaction/", { amount: razorpayOrder.amount, razorpay_response: response, order_id })
                    .then(
                        (success) => {
                            if (success.data.status) {
                                notify(success.data.msg, "success")
                                navigator(`/order-summary/${success.data.order_id}`);
                                dispatcher(emptyCart())
                            } else {
                                notify(success.data.msg, "error")
                            }
                        }
                    ).catch(
                        (error) => {

                        }
                    )
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
            },
            prefill: {
                name: userData.name,
                email: userData.email,
                contact: userData.contact,
            },
            theme: {
                color: "#ff4252",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            axios.post(apiBaseUrl + apiOrderUrl + "/order-transaction/", { amount: razorpayOrder.amount, razorpay_response: response.error.metadata, order_id })
                .then(
                    (success) => {
                        // navigator(`/order-summary/${success.data.order_id}`);
                        notify(success.data.msg, "error")

                    }
                ).catch(
                    (error) => {

                    }
                )
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });

        rzp1.open();
    }


    const table = [];
    for (let p of products) {
        const found = data.find(i => i.pId == p._id)
        if (found) {
            // total = p.discount_price * found.qty;
            table.push(<tr key={p._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="cursor-pointer font-bold text-center text-xl text-red-600 ">X</td>
                <td>

                    <img className={`object-cover aspect-square mx-auto w-[30%] cursor-pointer font-bold text-black text-center text-xl`} src={apiBaseUrl + productImgUrl + p.image} alt="" />
                </td>

                <th
                    scope="row"
                    className=" font-medium text-sm  text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {p.name}
                </th>
                <td className=" text-center">{p.discount_price}</td>
                <td className=" min-h-[150px] flex justify-start items-center gap-3">
                    <button onClick={() => {
                        dispatcher(changeQty({ pId: p._id, flag: 2, price: p.discount_price }))
                        changeCartqty(p._id, found.qty - 1)
                    }} className='p-2 shadow  rounded-lg bg-blue-500 text-white'>
                        -
                    </button>
                    <div className='p-2 border w-[20%]  text-center pe-6'>
                        {found.qty}
                    </div>
                    <button onClick={() => {
                        dispatcher(changeQty({ pId: p._id, flag: 1, price: p.discount_price }))
                        changeCartqty(p._id, found.qty + 1)
                    }} className='p-2 shadow rounded-lg bg-blue-500 text-white'>
                        +
                    </button>
                </td>
                <td className=" text-center">{p.price * found.qty}</td>
            </tr>)
        }
    }
    return (
        <Container>
            <div className='flex gap-1 '>
                <div className=' w-[100%]'>
                    <div className=' p-3 bg-[#bfc1c4] text-center my-3 select-none font-bold shadow-xl rounded-full'>Cart Details</div>
                    <div className="relative overflow-x-auto mt-[50px]">
                        <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 text-center"></th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Product Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 ">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {table}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='w-full '>
                    <div className=' p-3 bg-[#bfc1c4] text-center my-3 select-none font-bold shadow-xl rounded-full'>Shipping Details</div>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6  mt-[50px] border-l">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                            <input value={userData?.name} onChange={(e) => {
                                setUserData({ ...userData, name: e.target.value })
                            }


                            } type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input value={userData?.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">Contact</label>
                            <input value={userData?.contact} onChange={(e) => {
                                setUserData({ ...userData, contact: e.target.value })
                            }

                            } type="text" id="contact" name="contact" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                            <textarea value={userData?.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} id="address" name="address" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pincode" className="block text-gray-700 font-bold mb-2">Pincode</label>
                            <input value={userData?.pincode} onChange={(e) => setUserData({ ...userData, pincode: e.target.value })} type="text" id="pincode" name="pincode" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="paymentMode" className="block text-gray-700 font-bold mb-2">Payment Mode</label>
                            <div>
                                <input type="radio" onClick={() => { setUserData({ ...userData, paymentMode: 1 }) }} value={1} checked={userData?.paymentMode == 1 ? true : false} /> <span onClick={() => { setUserData({ ...userData, paymentMode: 1 }) }} className='cursor-pointer'>  COD (₹ 50 extra)</span>
                            </div>
                            <div>
                                <input type="radio" onClick={() => { setUserData({ ...userData, paymentMode: 2 }) }} value={2} checked={userData?.paymentMode == 2 ? true : false} />
                                <span onClick={() => { setUserData({ ...userData, paymentMode: 2 }) }} className='cursor-pointer'>
                                    Razorpay  (No extra charge)
                                </span>
                            </div>


                        </div>
                        <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Proceed</button>
                    </form>
                </div>
            </div>


        </Container>
    );
}

export default Checkout;
