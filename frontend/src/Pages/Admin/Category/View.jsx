import React, { useContext, useEffect, useState } from 'react';
import Card from '../../../Components/Admin/Card';
import BreadCrum from '../BreadCrum';
import { MainContext } from '../../../MainContext';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


const View = () => {
    const { fetchCategory, apiBaseUrl, apiCategoryUrl, notify } = useContext(MainContext);
    const [category, setcategory] = useState([]);
    const [imgBaseurl, setBaseurl] = useState('');


    const fetchCategorys = () => {
        fetchCategory()
            .then(
                (success) => {
                    if (success.status == 1) {
                        setcategory(success.data)
                        setBaseurl(success.fileBaseUrl)
                    } else {

                        setcategory([])
                    }
                }
            ).catch(
                (error) => {

                }
            )

    }

    useEffect(
        fetchCategorys,
        []
    )

    const Idhandelr = (id) => {
        axios.delete(apiBaseUrl + apiCategoryUrl + "/delete/" + id)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        notify(success.data.msg, "success")
                        fetchCategorys();
                    } else {
                        notify(success.data.msg, "error")

                    }
                }
            ).catch(
                (error) => {
                    notify("Client side error", "error")
                }
            )
        // const Newcategory = category.filter(
        //     (d, i) => {
        //         if (d._id == id) return false;
        //         else return true;
        //     }
        // )
        // setcategory(Newcategory)
    }

    const FetchbyID = (Id, status) => {
        axios.patch(apiBaseUrl + apiCategoryUrl + "/update" + "/" + Id + "/" + status).then(
            (success) => {
                if (success.data.status == 1) {
                    fetchCategorys();
                    notify(success.data.msg, "success")
                } else {
                    notify(success.data.msg, "error")

                }
            }
        ).catch(
            (error) => {
                console.log(error.massege)
                notify("Client side error", "error")
            }
        )
    }


    const breadcrum = [
        {
            name: 'Category',
            url: '/admin/category/view'
        }
    ]
    return (
        <Card>
            <BreadCrum items={breadcrum} />
            <hr className='my-5' />
            <div className="relative overflow-x-auto select-none">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map(
                                (cat, i) => {
                                    return <tr key={cat._id} className="bg-[white] !text-black border-b dark:bg-gray-800 dark:border-gray-700 ">
                                        <td className="px-6 py-4">{i + 1}</td>
                                        <td className="px-6 py-4">{cat.name}</td>
                                        <td className="px-6 py-4">{cat.slug}</td>
                                        <td className="px-6 py-4">
                                            <img width={50} src={apiBaseUrl + imgBaseurl + cat.image} alt="" />
                                        </td>
                                        <td className="px-6 py-4">{
                                            cat.status
                                                ?
                                                <button onClick={() => FetchbyID(cat._id, !cat.status)} className="p-2 bg-green-500 text-white rounded-full">
                                                    Active
                                                </button>
                                                :
                                                <button onClick={() => FetchbyID(cat._id, !cat.status)} className="p-2 bg-red-500 text-white rounded-full">
                                                    Inactive
                                                </button>

                                        }</td>

                                        <th className='flex items-center justify-center mx-auto gap-8 my-[20px]'>
                                            <MdDelete onClick={() => Idhandelr(cat._id)} className='cursor-pointer text-2xl text-red-500 ' />
                                            <Link to={"/admin/category/edit/" + cat._id}>
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
