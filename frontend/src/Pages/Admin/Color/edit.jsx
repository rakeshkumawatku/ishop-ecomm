import React, { useContext, useEffect, useRef, useState } from 'react';
import Card from '../../../Components/Admin/Card';
import BreadCrum from '../BreadCrum';
import axios from 'axios';
import { MainContext } from '../../../MainContext';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { apiBaseUrl, apiColorUrl, notify, fetchColor, setloader } = useContext(MainContext);
    const [colordata, setcolorData] = useState(null);


    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(

        () => {
            if (id != null) {
                fetchColor(id)
                    .then(
                        (success) => {
                            if (success.status == 1) {
                                setcolorData(success.data)
                            }
                        }
                    ).catch(
                        (error) => {

                        }
                    )
            }
        },
        [id]
    )


    const breadcrum = [
        {
            name: 'color',
            url: '/admin/color/view'
        },
        {
            name: "Edit",
            url: '/admin/color/add'
        }
    ]

    const formsubmithandler = (e) => {
        e.preventDefault();
        setloader(true);
        const name = e.target.name.value;
        const color = e.target.color.value;
        if (name != "" && color != "") {
            axios.put(apiBaseUrl + apiColorUrl + "/edit/" + id, { name: name, color: color }).then(
                (success) => {
                    if (success.data.status == 1) {
                        e.target.reset();
                        notify(success.data.msg, success.data.status ? "success" : "error");
                        navigate("/admin/color/view")

                    }
                }
            ).catch(
                (error) => {
                    notify(" Internal server error", "error")

                }
            ).finally(
                () => {
                    setloader(false)
                }
            )
        } else {
            setloader(false)

        }
    }
    return (
        <Card>
            <BreadCrum items={breadcrum} />
            <hr className='my-5' />

            <form encType='multipart/form-data' onSubmit={formsubmithandler}>
                <div className="mb-5">
                    <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name='name'
                        value={colordata?.name}
                        onChange={(e) => {
                            setcolorData({
                                ...colordata,
                                name: e.target.value,
                            })
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        color
                    </label>
                    <input
                        value={colordata?.color}
                        onChange={(e) => {
                            setcolorData({
                                ...colordata,
                                color: e.target.value,
                            })
                        }}
                        name='color'
                        type="color"
                        className="bg-gray-50  text-center shadow-lg text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full h-8 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"

                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Update
                </button>

            </form>

        </Card>
    );
}

export default Edit;
