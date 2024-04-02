import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MainContext } from '../../MainContext';
import axios from 'axios';
import Container from '../../Components/Website/Container';

const Ordersummary = () => {
    const { order_id } = useParams();
    const [order, setOrder] = useState(null);
    const { apiBaseUrl, productImgUrl, apiOrderUrl } = useContext(MainContext);
    const data = new Date().toLocaleString();

    useEffect(
        () => {
            axios.get(`http://localhost:5000/order/order-details/${order_id}`)
                .then(
                    (success) => {
                        if (success.data.status == 1) {
                            setOrder(success.data)
                        } else {
                            setOrder(null)
                        }
                    }
                ).catch(
                    (error) => {
                    }
                )
        },
        [order_id]
    )
    return (
        <Container>
            <>
                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div className="flex justify-start item-start space-y-2 flex-col">
                        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                            Thanks for ordering
                        </h1>
                        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                            21st Mart 2021 at 10:34 PM
                        </p>
                    </div>
                    {
                        order != null
                            ? <>
                                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                        <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                                Customer’s Cart
                                            </p>
                                            {
                                                order.order.product_details.map(
                                                    (data, index) => {
                                                        return (
                                                            <div key={index} className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                                                                <div className="w-full md:w-40">
                                                                    <img
                                                                        className="w-[100%] hidden md:block"
                                                                        src={apiBaseUrl + productImgUrl + data.image}
                                                                        alt="dress"
                                                                    />
                                                                    <img
                                                                        className="w-[30%] md:hidden"
                                                                        src={apiBaseUrl + productImgUrl + data.image}
                                                                        alt="dress"
                                                                    />
                                                                </div>
                                                                <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                                                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                                            {data.name}
                                                                        </h3>
                                                                        <div className="flex justify-start items-start flex-col space-y-2">
                                                                            <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                                Price:- {data.discount_price}
                                                                            </p>
                                                                            <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                                Qty :- {data.qty}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                        <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                                    Summary
                                                </h3>
                                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                                    <div className="flex justify-between w-full">
                                                        <p className="text-base dark:text-white leading-4 text-gray-800">
                                                            Subtotal
                                                        </p>
                                                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                                            {order.order.order_total - 50}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className="text-base dark:text-white leading-4 text-gray-800">
                                                            Discount{" "}
                                                            <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                                                                STUDENT
                                                            </span>
                                                        </p>
                                                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">

                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className="text-base dark:text-white leading-4 text-gray-800">
                                                            COD extra Charge
                                                        </p>
                                                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                                                            $50.00
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                                                        Total
                                                    </p>
                                                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                                        {order.order.order_total}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                            Customer
                                        </h3>
                                        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                                    <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                                                            {order.order.shipping_details.name}
                                                        </p>
                                                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                                                            10 Previous Orders
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                                    <img
                                                        className="dark:hidden"
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                                                        alt="email"
                                                    />
                                                    <img
                                                        className="hidden dark:block"
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                                                        alt="email"
                                                    />
                                                    <p className="cursor-pointer text-sm leading-5 ">
                                                        {order.order.shipping_details.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                                            Shipping Address
                                                        </p>
                                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                                            {order.order.shipping_details.address}
                                                        </p>
                                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                                            Address Pincode
                                                        </p>
                                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                                            {order.order.shipping_details.pincode}
                                                        </p>

                                                    </div>
                                                </div>
                                                <div className="flex w-full justify-center mt-4 items-center md:justify-start md:items-start">
                                                    <Link to={'/store'}>
                                                        <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-[250px] 2xl:w-full  leading-4 text-gray-800 text-xl">
                                                            Continue Shopping 🛒
                                                        </button>
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <></>
                    }
                </div>

            </>

        </Container>
    );
}

export default Ordersummary;
