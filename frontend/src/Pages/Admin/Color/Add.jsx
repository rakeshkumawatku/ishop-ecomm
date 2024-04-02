import React, { useContext, useRef } from 'react';
import Card from '../../../Components/Admin/Card';
import BreadCrum from '../BreadCrum';
import axios from 'axios'
import { MainContext } from '../../../MainContext';

const Add = () => {
    const { apiBaseUrl, notify,apiColorUrl } = useContext(MainContext);
    const titleref = useRef();
    const slugRef = useRef();

    const breadcrum = [
        {
            name: 'Color',
            url: '/admin/color/view'
        },
        {
            name: "Add",
            url: '/admin/color/add'
        }
    ]

    // const titleToSlug = () => {
    //     const slug = titleref.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    //     slugRef.current.value = slug;
    // }

    const formsubmithandler = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const color = e.target.color.value;
        if (name != "" && color != "") {
            axios.post(apiBaseUrl + apiColorUrl + "/create", { name: name, color: color }).then(
                (success) => {
                    if (success.data.status == 1) {
                        e.target.reset();
                        notify(success.data.msg, success.data.status ? "success" : "error")
                    }
                }
            ).catch(
                (error) => {
                    notify(" Internal server error", "error")

                }
            )
        } else {

        }
    }
    return (
        <Card>
            <BreadCrum items={breadcrum} />
            <hr className='my-5' />

            <form onSubmit={formsubmithandler}>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Color
                    </label>
                    <input
                        name='color'
                        type='color'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>

            </form>

        </Card>
    );
}

export default Add;
