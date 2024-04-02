import React, { useContext, useEffect, useState } from 'react';
import Container from '../../Components/Website/Container';
import { MainContext } from '../../MainContext';
import { IoIosColorFill } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import Slider from "react-slick";
import { generateRandomGradient } from '../../helper';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiGridFill } from "react-icons/ri";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../../Reduser/cart';
import axios from 'axios';




const Store = () => {
    const { category, setcategory, color, apiBaseUrl, categoryImgUrl, products, productImgUrl, fetchProduct, setProduct, setloader, apiUserUrl } = useContext(MainContext);

    const { category_slug } = useParams();
    const location = useLocation();

    const [searchparams] = useSearchParams();
    const [limit, setLimit] = useState(5);
    const [userColor, setUsercolor] = useState(null);
    const user = useSelector(store => store.user);

    useEffect(
        () => {

            setloader(true)
            fetchProduct(null, limit, category_slug, userColor)
                .then(
                    (success) => {
                        if (success.status == 1) {
                            setProduct(success.data)

                        } else {

                            setProduct([])
                        }
                    }
                ).catch(
                    (error) => {
                    }
                ).finally(
                    () => {
                        setloader(false)
                    }
                )
        },
        [limit, category_slug, userColor]
    )

    useEffect(
        () => {
            const UrlQuery = new URLSearchParams({ limit });
            if (userColor != null) {
                UrlQuery.append("color", userColor)
            }
            const currentURL = window.location.pathname;
            const newURl = currentURL + '?' + UrlQuery.toString();
            window.history.pushState({ path: newURl }, '', newURl)
        },
        [limit, userColor, category_slug, location, userColor]
    )

    useEffect(() => {
        const searchlimit = searchparams.get("limit")
        const searchColor = searchparams.get("color")
        if (searchColor != null || searchlimit != null) {
            if (searchlimit != null) setLimit(searchlimit);
            if (searchColor != null) setUsercolor(searchColor)
        }
    }, [location])
    // useEffect(
    //     () => {
    //         if (category_slug != undefined) {
    //         }
    //     },
    //     [category_slug]
    // )
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <Container>
            <div className='grid grid-cols-4 gap-3 select-none'>
                <div className='h-[400px] m-5 sm:flex flex-col hidden'>
                    <div className='mt-5 p-4 bg-[#F6F7F8]'>
                        <div className='text-[16px] font-bold uppercase flex items-center gap-2 p-3 '>Categories <MdCategory className='text-1xl' /></div>
                        <ul className='flex justify-center  flex-col gap-2 cursor-pointer '>
                            {
                                category.map(
                                    (cat) => {
                                        return <Link key={cat._id} to={"/store/" + cat.slug}>
                                            <li className={`hover:text-[#60e3ea] text-[12px] ms-3 flex justify-between items-center `}>{cat.name}
                                                <span>({cat.count})</span>
                                            </li>
                                        </Link>
                                    }
                                )
                            }
                        </ul>
                    </div>
                    <div className='mt-5 p-4 bg-[#F6F7F8]'>
                        <div className='text-[16px] font-bold uppercase flex items-center gap-2 p-3'>Color <IoIosColorFill className='text-1xl' /></div>
                        <ul className='flex justify-center p-5 flex-col gap-4 cursor-pointer  '>
                            {
                                color.map(
                                    (col) => {
                                        return (
                                            <li key={col._id} onClick={() => setUsercolor(col._id)} className={`hover:text-[#60e3ea] text-[12px] flex gap-5  items-center ${col._id == userColor ? "font-bold" : ""}`}>
                                                <span className='p-2 rounded-full' style={{ background: col.color }}></span>
                                                {col.name}
                                            </li>
                                        )

                                    }
                                )
                            }
                        </ul>
                    </div>

                </div>
                <div className='sm:col-span-3 p-3 m-5 col-span-4'>
                    <Slider {...settings}>
                        {category.map((data) => {
                            return (
                                <div key={data._id}>
                                    <div style={{ background: generateRandomGradient() }} className='relative h-[300px]'>
                                        <div className='text-2xl font-bold uppercase p-5 text-white'>{data.name}</div>
                                        <div className=' text-white m-4 p-3'>
                                            Performance and design. Taken right to the edge.
                                        </div>
                                        <Link to={"/store/" + data.slug}>

                                            <button className='border text-white m-4 p-3 hover:bg-black hover:border-black rounded-xl'>Show Now</button>
                                        </Link>
                                        <img src={apiBaseUrl + categoryImgUrl + data.image} alt="" className=' w-[25%] h-[60%] absolute bottom-5 right-5' />
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                    <ProductGrid products={products} productImgUrl={productImgUrl} user={user} apiBaseUrl={apiBaseUrl} apiUserUrl={apiUserUrl} limit={limit} setLimit={setLimit} />
                </div>
            </div>
        </Container>
    );
}


export default Store;

const ProductGrid = ({ products, productImgUrl, apiBaseUrl, setLimit, limit, apiUserUrl, user }) => {
    const [Grid, setGrid] = useState(true);
    const cartDispacher = useDispatch();


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

    useEffect(
        () => {
            const lsGrid = localStorage.getItem("Grid");
            if (lsGrid != undefined) {
                lsGrid == 1 ? setGrid(true) : setGrid(false);
                // setGrid(lsGrid)
            }
        },
        []
    )

    return (
        <div className='my-10'>
            <div className='my-2 p-2 bg-[#F6F7F8] flex gap-2 items-center relative'>
                <div className=' bg-[#F6F7F8] '>
                    <select name="" id="" value={limit} onChange={(e) => { setLimit(e.target.value) }} className='bg-transparent focus:outline-none p-2 '>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="0">All</option>
                    </select>

                </div>
                <div className='flex gap-3 items-center absolute right-3'>
                    <RiGridFill fontSize={25} onClick={() => {
                        setGrid(true)
                        localStorage.setItem("Grid", 1)
                    }
                    } color={Grid ? '#2678FB' : "black"} />
                    <FaList fontSize={25} onClick={() => {
                        setGrid(false)
                        localStorage.setItem("Grid", 0)
                    }
                    } color={Grid ? 'black' : "#2678FB"} />
                </div>

            </div>
            <div className={` ${Grid ? `grid grid-cols-3 ` : ``} gap-3`}>
                {
                    products.map(
                        (d) => {
                            return <div key={d._id} className={`${Grid ? `flex` : `flex-col`} col-span-4 md:col-span-1 sm:col-span-2 text-center border-4 mx-[30px] md:mx-auto  sm:mx-[20px] p-3  border-gray-100`}>
                                <div className={` CartHovera flex overflow-hidden justify-between items-center ${!Grid ? `flex-row` : `flex-col`}`}>
                                    {/* <div className={`bg-red-500 text-white w-[40px] text-center ${d.hot==hot ? 'opacity-1':"opacity-0"}`}>HOT</div> */}
                                    <div className={`text-center flex items-center justify-center sm:h-[200px] h-[120px]`}>

                                        <img className={` aspect-square sm:w-[80%] w-[50%]`} src={apiBaseUrl + productImgUrl + d.image} alt="" />
                                    </div>
                                    <hr className='mt-[40px] mb-[20px]' />

                                    <div className={`flex flex-col ${Grid ? "w-[80%]" : "w-[50%] me-24"}  relative`}>
                                        <h1 className='text-[14px] font-bold text-black'>{d.name}</h1>
                                        <div className='flex my-[20px] justify-center'>
                                            <FaStar className='text-yellow-500' />
                                            <FaStar className='text-yellow-500' />
                                            <FaStar className='text-yellow-500' />
                                            <FaStar className='text-yellow-500' />
                                            <FaStar className='text-gray-400' />
                                        </div>
                                        <div className='text-[16px] w-[full]'>
                                            <span className='text-[#FF4858] me-2'>₹ {d.discount_price}</span>
                                            <span className="line-through text-[#C1C8CE]">₹ {d.price}</span>
                                            <div className='  h-[120px] absolute w-full bottom-[-200%] rounded-lg flex justify-center items-center text-3xl gap-5 cursor-pointer  bg-slate-200'>
                                                <FaCartArrowDown className='hover:text-emerald-500' onClick={() => {
                                                    cartDispacher(AddToCart({ pId: d._id, price: d.discount_price }))
                                                    LoginAddProudct(d._id)
                                                }} />
                                                <FaHeart className='hover:text-emerald-500' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }
                    )
                }
            </div>
        </div>

    )
}