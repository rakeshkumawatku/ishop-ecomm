import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Card from '../../Components/Admin/Card';
import BreadCrum from './BreadCrum';
import { MainContext } from '../../MainContext';

const Order = () => {
    const [orders, setOrder] = useState([]);
    const { products, apiBaseUrl, productImgUrl, notify, apiUserUrl, apiOrderUrl } = useContext(MainContext);
    const StartDateRef = useRef()
    const EndDateRef = useRef();



    // const datefilterHalder = () => {
    //     const query = new URLSearchParams({
    //         start: StartDateRef.current.value,
    //         end: EndDateRef.current.value
    //     })
    //     axios.get(apiBaseUrl + apiOrderUrl + "/get-data?" + query.toString())
    //         .then(
    //             (success) => {
    //                 if (success.data.status) {
    //                     setOrder(success.data.Order_data)
    //                 } else {

    //                 }
    //             }
    //         ).catch(
    //             (error) => {
    //             }
    //         )
    // }
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
        }, []
    )

    const filterTime = () => {
        const start = (StartDateRef.current.value)
        const end = (EndDateRef.current.value)
        if (start <= end) {
            if (start != '' && end != '') {
                axios.get(apiBaseUrl + apiOrderUrl + "/order-details?start=" + start + "&end=" + end).then((success) => {
                    console.log(success)
                    setOrder(success.data.data);
                }).catch((err) => {
                    setOrder([]);
                })
            } else {
                notify("please enter both Dates", "error");
            }
        } else {
            notify("please put a valid date, because end-date must be greater or equal to start date", "error");
        }
    }


    const clearDate = () => {
        axios.get(apiBaseUrl + apiOrderUrl + "/order-details").then((success) => {
            console.log(success)
            setOrder(success.data.data);
        }).catch((err) => {
            setOrder([]);
        })
    }



    const breadcrum = [
        {
            name: 'Order',
            url: '/admin/order'
        }
    ]

    return (
        <div>
            <Card>
                <BreadCrum items={breadcrum} />
                <hr className='my-5' />
                <div className="relative overflow-x-auto select-none">
                    <div className='flex items-center  my-5  p-5 gap-5 rounded-lg' style={{boxShadow: "0px 0px 10px 5px inset rgba(129, 218, 236, 0.8)"}}>
                        <div>
                            <label htmlFor="" className='mx-5 font-semibold text-black'>From</label>
                            <input ref={StartDateRef} type="date" className='p-2 shadow outline-none' />
                        </div>
                        <div>
                            <label htmlFor="" className='mx-5 font-semibold text-black'>To</label>
                            <input ref={EndDateRef} type="date" className='p-2 shadow outline-none  rounded-lg' />
                        </div>
                        <button className='bg-orange-500 duration-500 p-2 px-5 rounded-xl font-bold   text-white hover:bg-blue-600' onClick={filterTime}>Find</button>
                        <button className='bg-orange-500 p-2 rounded-xl  font-bold text-white  hover:bg-blue-600' onClick={clearDate}>Found All Orders</button>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                orders.map(
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

            </Card>
        </div>
    );
}


const TableRow = ({ prod, index, apiBaseUrl, apiOrderUrl, notify }) => {
    const [order_status, SetOrder_status] = useState(prod.order_status)


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

export default Order;
