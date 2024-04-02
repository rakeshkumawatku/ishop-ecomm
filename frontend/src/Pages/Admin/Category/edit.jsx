import React, { useContext, useEffect, useRef, useState } from 'react';
import Card from '../../../Components/Admin/Card';
import BreadCrum from '../BreadCrum';
import axios from 'axios';
import { MainContext } from '../../../MainContext';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { apiBaseUrl, apiCategoryUrl, notify, fetchCategory, setloader } = useContext(MainContext);
    const titleref = useRef();
    const slugRef = useRef();
    const [categorydata, setcategoryData] = useState(null);
    const [CategoryImage, SetCatetoryImage] = useState(null);


    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(

        () => {
            if (id != null) {
                fetchCategory(id)
                    .then(
                        (success) => {
                            if (success.status == 1) {
                                setcategoryData(success.data)
                                SetCatetoryImage(success.fileBaseUrl)
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
            name: 'Category',
            url: '/admin/category/view'
        },
        {
            name: "Edit",
            url: '/admin/category/add'
        }
    ]

    const titleToSlug = (value) => {
        const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return slug;
    }

    const formsubmithandler = (e) => {
        e.preventDefault();
        setloader(true);
        const name = e.target.name.value;
        const slug = e.target.slug.value;
        const image = e.target.image.files[0];
        if (name != "" && slug != "") {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("image", image);
            formData.append("oldImage", categorydata.image)
            // console.log(apiBaseUrl+apiCategoryUrl+"/create");
            axios.put(apiBaseUrl + apiCategoryUrl + "/UpdateData/" + id, formData).then(
                (success) => {
                    if (success.data.status == 1) {
                        e.target.reset();
                        notify(success.data.msg, success.data.status ? "success" : "error");
                        navigate("/admin/category/view")

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
                        value={categorydata?.name}
                        onChange={(e) => {
                            setcategoryData({
                                ...categorydata,
                                name: e.target.value,
                                slug: titleToSlug(e.target.value)
                            })
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        inputMode='Numeric'
                        ref={titleref}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Slug
                    </label>
                    <input
                        readOnly
                        name='slug'
                        value={categorydata?.slug}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        ref={slugRef}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Image
                    </label>
                    <input
                        type="file"
                        name='image'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <img width={100} height={100} src={apiBaseUrl + CategoryImage + "/" + categorydata?.image} alt="" />
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
