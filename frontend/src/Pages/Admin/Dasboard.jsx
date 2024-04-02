import React, { useContext, useEffect, useState } from 'react';
import { FaBoxArchive } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { MainContext } from '../../MainContext';
import axios from 'axios';
import Barchart from './Products/Barchart';
import Piechart from './Products/Piechart';

const Dasboard = () => {
    const [user, setUser] = useState([]);
    const [orders, setOrder] = useState([]);
    const [todayOrder, setTodayOrder] = useState([])
    const { category, apiBaseUrl, products,notify, apiUserUrl, apiOrderUrl } = useContext(MainContext);

    useEffect(
        () => {
            axios.get(apiBaseUrl + apiOrderUrl + "/get-data")
                .then(
                    (success) => {
                        if (success.data.status) {
                            setOrder(success.data.Order_data)

                        } else {

                        }
                    }
                ).catch(
                    (error) => {
                    }
                )


            axios.get(apiBaseUrl + apiOrderUrl + "/todayOrder")
                .then(
                    (success) => {
                        if (success.data.status) {
                            setTodayOrder(success.data.TodayOrder)

                        } else {
                        }
                    }
                ).catch(
                    (error) => {
                    }
                )
        }, []
    )

    console.log(todayOrder,"dsafdsf")


    useEffect(
        () => {
            axios.get(apiBaseUrl + apiUserUrl)
                .then(
                    (success) => {
                        if (success.data.status == 1) {
                            setUser(success.data.UserData)

                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error, "error")
                    }
                )
        },
        []
    )

    console.log(products, "order")




    return (
        <>
            <div className='m-5 grid grid-cols-4 gap-2 uppercase select-none'>
                <div className=' bg-blue-500 text-white text-3xl font-bold  p-10 rounded-xl leading-loose'>
                    <div className='flex justify-center items-center gap-5'> Products <FaBoxArchive /></div>
                    <div className='text-center'>
                        {products?.length}
                    </div>
                </div>
                <div className=' bg-orange-400 text-white text-3xl font-bold  p-10 rounded-xl leading-loose'>
                    <div className='flex justify-center items-center gap-5'> Categories <BiCategory /></div>
                    <div className='text-center'>
                        {category?.length}
                    </div>
                </div>
                <div className=' bg-green-500 text-white text-3xl font-bold  p-10 rounded-xl leading-loose'>
                    <div className='flex justify-center items-center gap-5'> Customers <FaUsers /></div>
                    <div className='text-center'>
                        {user?.length}
                    </div>
                </div>
                <div className=' bg-red-500 text-white text-3xl font-bold  p-10 rounded-xl leading-loose'>
                    <div className='flex justify-center items-center gap-5'> orders <FaBell /></div>
                    <div className='text-center'>
                        {orders?.length}
                    </div>
                </div>
            </div>
            <hr className='mt-5 mb-5 border' />
            <div className='flex-col items-center justify-center'>
                <div className='text-2xl font-bold text-black text-center'>Revenue Chart</div>
                <Barchart />
            </div>
            <div>
                <Piechart />
            </div>


            <div className='bg-blue-200'>
            <div className='text-center text-4xl font-bold  text-black p-3'>Today Order's</div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            
                        <thead className="text-xs  uppercase bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    SR
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Details
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User Details
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Order Status
                                </th>
                                <th>
                                    Order Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                todayOrder?.map(
                                    (prod, i) => {
                                        return (
                                            <TableRow prod={prod} index={i} key={i} apiBaseUrl={apiBaseUrl} apiOrderUrl={apiOrderUrl} notify={notify} />
                                        )
                                    }
                                )
                            }


                        </tbody>
                    </table>
            </div>

        </>
    );
}

const TableRow = ({ prod, index, apiBaseUrl, apiOrderUrl, notify }) => {
    const [order_status, SetOrder_status] = useState(prod.order_status)
    console.log(prod.user_id._id, "order")


    const changeStatus = (New_status) => {
        SetOrder_status(New_status)
        axios.post(apiBaseUrl + apiOrderUrl + "/update-order-status/" + prod._id + "/" + New_status)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        notify(success.data.msg, "success")
                    } else {
                        notify(success.data.msg, "error")
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }
    return (
        <tr key={index} className="  !text-white border-b border-black dark:bg-gray-800 dark:border-gray-700 ">
            <td className='px-6 py-4 text-black font-bold'>
                {index + 1}
            </td>
            <td className='px-6 py-4 text-black'>
                {
                    prod.product_details.map(
                        (prod, index) => {
                            return (
                                <div key={index} className='my-3 '>
                                    <div>
                                        <b>{index + 1})</b>  Name: {prod.name}
                                    </div>
                                    <div>
                                        Price:  {prod.discount_price}
                                    </div>
                                    <div>
                                        Qty: {prod.qty}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
                <hr className='my-2 border-black' />
                <b> total:</b> {prod.order_total}
            </td>
            <td className='px-6 py-4 text-black'>
                <div>Name: {prod.shipping_details.name}</div>
                <div>Email: {prod.shipping_details.email}</div>
                <div>Contact: {prod.shipping_details.contact}</div>
                <div>Address: {prod.shipping_details.address}</div>
                <div>Pincode: {prod.shipping_details.pincode}</div>
                <div></div>
            </td>
            <td>
                <select onChange={(e) => changeStatus(e.target.value)} value={order_status} name="" id="" className='p-1 bg-blue-500 rounded-lg shadow-xl focus:outline-none font-bold'>
                    <option value="1">Payment pending</option>
                    <option value="2">Payment Done</option>
                    <option value="3">Shipped</option>
                    <option value="4">Delivered</option>
                    <option value="5">Cancelled</option>
                    <option value="6">Retrun</option>
                    <option value="7">Refund</option>
                </select>
            </td>
            <td className='text-black'>
                <span className='font-bold '> CreatedAt:</span>
                <div className='text-[11px]'>
                    {new Date(prod.createdAt).toLocaleDateString()}
                    <br />
                    {new Date(prod.createdAt).toLocaleTimeString()}
                </div>

                <hr className='my-3' />
                <span className='font-bold '>  UpdatedAt:</span>

                <div className='text-[11px]'>
                    {new Date(prod.updatedAt).toLocaleDateString()}
                    <br />
                    {new Date(prod.updatedAt).toLocaleTimeString()}
                </div>

            </td>
        </tr>
    )
}


export default Dasboard;
