import React, { useContext, useEffect, useState } from 'react';
import Card from '../../../Components/Admin/Card';
import BreadCrum from '../BreadCrum';
import { MainContext } from '../../../MainContext';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


const View = () => {
    const { fetchProduct, apiBaseUrl, apiProductUrl, notify } = useContext(MainContext);
    const [product, setproduct] = useState([]);
    const [productImgUrl, SetproductImgUrl] = useState('');


    const fetchproducts = () => {
        fetchProduct()
            .then(
                (success) => {
                    if (success.status == 1) {
                        setproduct(success.data)
                        SetproductImgUrl(success.fileBaseUrl)
                    } else {

                        setproduct([])
                    }
                }
            ).catch(
                (error) => {

                }
            )

    }

    useEffect(
        fetchproducts,
        []
    )

    const Idhandelr = (id) => {
        axios.delete(apiBaseUrl + apiProductUrl + "/delete/" + id)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        notify(success.data.msg, "success")
                        fetchproducts();
                    } else {
                        notify(success.data.msg, "error")

                    }
                }
            ).catch(
                (error) => {
                    notify("Client side error", "error")
                }
            )
    }

    const FetchbyID = (Id, status) => {
        axios.patch(apiBaseUrl + apiProductUrl + "/update" + "/" + Id + "/" + status).then(
            (success) => {
                if (success.data.status == 1) {
                    fetchproducts();
                    notify(success.data.msg, "success")
                } else {
                    notify(success.data.msg, "error")

                }
            }
        ).catch(
            (error) => {
                notify("Client side error", "error")
            }
        )
    }


    const breadcrum = [
        {
            name: 'product',
            url: '/admin/product/view'
        }
    ]
    return (
        <Card>
            <BreadCrum items={breadcrum} />
            <hr className='my-5' />
            <div className="relative overflow-x-auto select-none">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SR
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th>
                                Category Name
                            </th>
                            <th>
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map(
                                (prod, i) => {
                                    return <tr key={prod._id} className="bg-[#514e4e] !text-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                        <td className="px-8 py-2">{i + 1}</td>
                                        <td className="px-8 py-2">{prod.name}</td>
                                        <td className="px-8 py-2">{prod.slug}</td>
                                        <td className="px-8 py-2">
                                            <img width={50} src={apiBaseUrl + productImgUrl + prod.image} alt="" />
                                        </td>
                                        <td className="px-6 py-4">
                                            {prod.category?.name}
                                        </td>
                                        <td>
                                            <ul style={{ listStyle: "circle" }}>
                                                {
                                                    prod.color.map(
                                                        (c, i) => {
                                                            return <li style={{ listStyle: "inherit" }} key={i}>{c.name}</li>
                                                        }
                                                    )
                                                }
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4">{
                                            prod.status
                                                ?
                                                <button onClick={() => FetchbyID(prod._id, !prod.status)} className="p-2 bg-green-500 text-white rounded-full">
                                                    Active
                                                </button>
                                                :
                                                <button onClick={() => FetchbyID(prod._id, !prod.status)} className="p-2 bg-red-500 text-white rounded-full">
                                                    Inactive
                                                </button>

                                        }</td>

                                        <th className='flex items-center justify-center mx-auto gap-8 my-[20px]'>
                                            <MdDelete onClick={() => Idhandelr(prod._id)} className='cursor-pointer text-2xl text-red-500 ' />
                                            <Link to={"/admin/product/edit/" + prod._id}>
                                                <FaEdit className='cursor-pointer text-2xl text-gray-500' />
                                            </Link>
                                        </th>
                                    </tr>
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
