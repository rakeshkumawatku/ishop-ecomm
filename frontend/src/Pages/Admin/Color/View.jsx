import React, { useContext, useEffect, useState } from 'react';
import Card from '../../../Components/Admin/Card';
import BreadCrum from '../BreadCrum';
import { MainContext } from '../../../MainContext';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


const View = () => {
    const { fetchColor, apiBaseUrl, notify, apiColorUrl, color,fetchColorHandler } = useContext(MainContext);





    const FetchbyID = (Id, status) => {
        axios.patch(apiBaseUrl + apiColorUrl + "/update_status" + "/" + Id + "/" + status).then(
            (success) => {
                if (success.data.status == 1) {
                    notify(success.data.msg, "success")
                    fetchColorHandler();
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

    const Idhandelr = (id) => {
        axios.delete(apiBaseUrl + apiColorUrl + "/delete/" + id)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        notify(success.data.msg, "success")
                        fetchColorHandler();

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
            name: 'Color',
            url: '/admin/color/view'
        }
    ]
    return (
        <Card>
            <BreadCrum items={breadcrum} />
            <hr className='my-5' />
            <div className="relative overflow-x-auto select-none">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='text-center'>
                            <th scope="col" className="px-6 py-3">
                                SR
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
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
                    <tbody className='text-center'>
                        {
                            color.map(
                                (cat, i) => {
                                    return <tr key={cat._id} className="bg-[#514e4e] !text-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{i + 1}</td>
                                        <td className="px-6 py-4 font-bold"
                                            style={{
                                                color: cat.color
                                            }}>{cat.name}</td>
                                        <td className="px-6 ">
                                            <div className='p-3 mx-auto w-16 rounded-full border' style={{
                                                background: cat.color
                                            }}></div>
                                        </td>
                                        <td className="px-6 py-4">{
                                            cat.status
                                                ?
                                                <button onClick={() => FetchbyID(cat._id, !cat.status)} className="p-2 bg-green-500 text-black font-bold rounded-full">
                                                    Active
                                                </button>
                                                :
                                                <button onClick={() => FetchbyID(cat._id, !cat.status)} className="p-2 bg-red-500 text-black font-bold rounded-full">
                                                    Inactive
                                                </button>

                                        }</td>
                                        <th className='flex items-center gap-3 my-[20px] justify-center'>
                                            <MdDelete onClick={() => Idhandelr(cat._id)} className='cursor-pointer text-2xl text-red-500 ' />
                                            <Link to={"/admin/color/edit/" + cat._id}>
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
