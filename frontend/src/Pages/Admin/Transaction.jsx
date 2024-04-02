import React, { useContext, useEffect, useState } from 'react';
import Card from '../../Components/Admin/Card';
import BreadCrum from './BreadCrum';
import { MainContext } from '../../MainContext';
import axios from 'axios';


const View = () => {
    const { apiBaseUrl, apiOrderUrl, notify } = useContext(MainContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(
        () => {
            axios.get(apiBaseUrl + apiOrderUrl + "/read-transaction/")
                .then(
                    (success) => {
                        if (success.data.status) {
                            setTransactions(success.data.data)
                        } else {
                        }
                    }
                ).catch(
                    (error) => {
                    }
                )
        },
        []
    )






    const breadcrum = [
        {
            name: 'Transaction',
            url: '/admin/Transaction'
        }
    ]
    return (
        <Card>
            <BreadCrum items={breadcrum} />
            <hr className='my-5' />
            <div className="relative overflow-x-auto select-none">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead className="text-xs  text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='text-center'>
                            <th scope="col" className="px-6 py-3">
                                Payment ld
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Razorpay Order ld
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                contact
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                CreatedAt
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map(
                                (order, index) => {
                                    return (
                                        <tr key={index} className='text-center text-black'>
                                            <td className='text-blue-500 p-2'>{order.razorpay_payment_id}</td>
                                            <td className='text-blue-500'>{order.razorpay_order_id}</td>
                                            <td>₹ {order.order_id?.order_total}</td>
                                            <td>{order.order_id?.shipping_details.email}</td>
                                            <td>+91{order.order_id?.shipping_details.contact}</td>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                            <td>
                                                {
                                                    order.payment_status == false ? <button className='bg-red-500 px-2 py-1 rounded-xl text-white'>Faild</button> : <button className='bg-green-500 p-2 rounded-xl text-white'>Captured</button>
                                                }


                                            </td>
                                        </tr>

                                    )
                                }
                            )
                        }

                    </tbody>
                </table>
            </div>

        </Card>
    );
}

export default View;
