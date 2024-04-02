import React, { useContext, useState } from 'react';
import { FaStar } from "react-icons/fa";
// import Data from '../../seller-data';
import { MainContext } from '../../MainContext';
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../../Reduser/cart';
import axios from 'axios';

const SellerBox = () => {
    // const [hot, sethot] = useState(true);
    let { products, apiBaseUrl, productImgUrl, filterCat, apiUserUrl } = useContext(MainContext);
    const cartDispacher = useDispatch();
    const user = useSelector(store => store.user);

    const LoginAddProudct = (product_id) => {
        if (user.data != null) {
            axios.post(apiBaseUrl + apiUserUrl + "/login-add-product", { product_id, user_id: user.data._id })
                .then(
                    (success) => { }
                ).catch(
                    (error) => { }
                )
        }
    }

    if (filterCat != null) {
        products = products.filter(
            (prod) => {
                return prod.category._id == filterCat;
            }
        )
    }
    return (

        <>

            {
                products.map(
                    (d, i) => {
                        return (
                            <div key={i} className='col-span-4 md:col-span-1 sm:col-span-2 text-center border-4 mx-[30px] md:mx-auto  sm:mx-[20px] p-3  border-gray-100'>
                                <div className='relative CartHovera overflow-hidden '>
                                    {/* <div className={`bg-red-500 text-white w-[40px] text-center ${d.hot==hot ? 'opacity-1':"opacity-0"}`}>HOT</div> */}
                                    <div className='text-center flex flex-col justify-center items-center h-[250px]'>

                                        <img className='sm:w-[80%] w-[50%]' src={apiBaseUrl + productImgUrl + d.image} alt="" />
                                    </div>
                                    <hr className='mt-[40px] mb-[20px]' />

                                    <h1 className='text-[14px] font-bold text-black'>{d.name}</h1>
                                    <div className='flex my-[20px] justify-center'>
                                        <FaStar className='text-yellow-500' />
                                        <FaStar className='text-yellow-500' />
                                        <FaStar className='text-yellow-500' />
                                        <FaStar className='text-yellow-500' />
                                        <FaStar className='text-gray-400' />
                                    </div>
                                    <div className='text-[16px] '>
                                        <span className='text-[#FF4858] me-2'>₹ {d.discount_price}</span>
                                        <span className="line-through text-[#C1C8CE]">₹{d.price}</span>
                                        <div className='  h-[120px] absolute w-full bottom-[-100%] rounded-lg flex justify-center items-center text-3xl gap-5 cursor-pointer  bg-slate-200'>
                                            <FaCartArrowDown className='hover:text-emerald-500' onClick={() => {
                                                cartDispacher(AddToCart({ pId: d._id, price: d.discount_price }))
                                                LoginAddProudct(d._id)
                                            }} />
                                            <FaHeart className='hover:text-emerald-500' />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                )
            }
        </>


    );
}

export default SellerBox;
