import React, { useContext, useEffect, useRef, useState } from 'react';
import Card from '../../../Components/Admin/Card';
import BreadCrum from '../BreadCrum';
import { MainContext } from '../../../MainContext';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';

const animatedComponents = makeAnimated();

const Add = () => {
    const { fetchCategory, apiBaseUrl, notify, fetchColor, apiProductUrl } = useContext(MainContext);
    const [category, setcategory] = useState([]);
    const [Color, setColor] = useState([]);
    const [productCol, setProductCol] = useState(null);
    const [productCat, SetProductCat] = useState(null);
    const titleref = useRef();
    const slugRef = useRef();
    const priceRef = useRef();
    const percentRef = useRef();
    const discountRef = useRef()



    useEffect(
        () => {
            fetchCategory()
                .then(
                    (success) => {
                        setcategory(success.data)
                    }
                ).catch(
                    (error) => {
                        setcategory([])
                    }
                )

            fetchColor()
                .then(
                    (success) => {
                        setColor(success.data)
                    }
                ).catch(
                    (error) => {
                        setColor([])
                    }
                )
        },
        []
    )


    const formsubmithandler = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const slug = e.target.slug.value;
        const price = e.target.price.value;
        const discunt_percent = e.target.discunt_percent.value;
        const discount_price = e.target.discount.value;
        const image = e.target.image.files[0]



        if (name != "" && slug != "" && price != "" && productCat != null && productCol.length != 0) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("price", price);
            formData.append("discount_price", discount_price);
            formData.append("discunt_percent", discunt_percent);
            const cArr = productCol.map(c => c.value);
            formData.append("color", JSON.stringify(cArr));
            formData.append("category", productCat.value);
            formData.append("image", image)
            axios.post(apiBaseUrl + apiProductUrl + "/create", formData).then(
                (success) => {
                    if (success.data.status == 1) {
                        e.target.reset();
                        setProductCol(null);
                        SetProductCat(null);
                        notify(success.data.msg, success.data.status ? "success" : "error")
                    }
                }
            ).catch(
                (error) => {
                    notify("Internal server error", "error")

                }
            )


        } else {

        }
    }





    const titleToSlug = () => {
        const slug = titleref.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        slugRef.current.value = slug;
    }

    const calcDiscount = () => {
        if (priceRef.current.value != "" && percentRef != "") {
            const dis = parseInt((priceRef.current.value * percentRef.current.value) / 100);
            discountRef.current.value = priceRef.current.value - dis;
        }
    }


    const Colerhandler = (Options) => {
        // const ids = Options.map((d) => d.value)
        setProductCol(Options)
    }

    const CategoryHandler = (Option) => {
        SetProductCat(Option)
    }

    const breadcrum = [
        {
            name: 'product',
            url: '/admin/product/view'
        },
        {
            name: "Add",
            url: '/admin/product/add'
        }
    ]
    return (
        <Card>
            <BreadCrum items={breadcrum} />
            <hr className='my-5' />

            <form encType='multipart/form-data' onSubmit={formsubmithandler} >
                <div className="grid grid-cols-2 gap-4 ">
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
                            inputMode='Numeric'
                            onChange={titleToSlug}
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ref={slugRef}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="mb-5">
                        <label
                            htmlFor="base-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Price
                        </label>
                        <input
                            type="Number"
                            name='price'
                            min={0}
                            onChange={calcDiscount}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            inputMode='Numeric'
                            ref={priceRef}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="base-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Discount Percent %
                        </label>
                        <input
                            max={99}
                            min={0}
                            type='Number'
                            onChange={calcDiscount}
                            name='discunt_percent'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ref={percentRef}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="base-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Discount Price
                        </label>
                        <input
                            readOnly
                            type='Number'
                            name='discount'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ref={discountRef}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-5">
                        <label
                            htmlFor="base-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Category
                        </label>
                        <Select
                            value={productCat}
                            onChange={CategoryHandler}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            options={
                                category.map(
                                    (cat) => {
                                        return { value: cat._id, label: cat.name }
                                    }
                                )
                            }
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="base-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Color
                        </label>
                        <Select
                            value={productCol}
                            onChange={Colerhandler}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={
                                Color.map(
                                    (color) => {
                                        return { value: color._id, label: color.name }
                                    }
                                )
                            }
                        />
                    </div>
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
