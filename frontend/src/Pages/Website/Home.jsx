import React, { useContext } from 'react';
import Container from '../../Components/Website/Container';
import SellerBox from '../../Components/Website/Seller-box';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { footerData } from '../../seller-data';
import { MainContext } from '../../MainContext';


const Home = () => {
    const { category, setfilterCat, filterCat } = useContext(MainContext);


    const freeShipping = [
        {
            img: 'images/shipping.png',
            heading: "FREE SHIPPING",
            descripsion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias corrupti eligendi delectus totam dignissimos sapiente ipsa iusto. Veniam nam architecto esse enim sunt veritatis asperiores quae consectetur atque natus.',
        },
        {
            img: 'images/refund.png',
            heading: "100% REFUND",
            descripsion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias corrupti eligendi delectus totam dignissimos sapiente ipsa iusto. Veniam nam architecto esse enim sunt veritatis asperiores quae consectetur atque natus.',
        },
        {
            img: 'images/support.png',
            heading: "SUPPORT 24/7",
            descripsion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias corrupti eligendi delectus totam dignissimos sapiente ipsa iusto. Veniam nam architecto esse enim sunt veritatis asperiores quae consectetur atque natus.',
        },


    ]


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]
    };
    return (
        <>
            <div className='w-full h-[450px] md:h-[650px] relative banner-bg'>
                <img src="images/corousel.png" className='absolute md:h-[auto] h-[100%] bottom-0 sm:right-[30%] md:right-[100px]' alt="" />
            </div>
            <Container>
                <div className='pt-5 '>
                    <h1 className='text-center text-[30px]'>BEST SELLER</h1>
                </div>
                <ul className='md:flex hidden justify-center mt-5 uppercase gap-7'>
                    <li className={`${filterCat == null ? "border-b-4 border-[#60a5fa]  font-bold text-blue-400" : ""}   cursor-pointer `} onClick={() => setfilterCat(null)}>All</li>
                    {
                        category.map(
                            (data, i) => {
                                return (
                                    <li key={i} onClick={() => setfilterCat(data._id)} className={`${filterCat == data._id ? "border-b-4 border-[#60a5fa] font-bold text-blue-400" : ""} cursor-pointer`}>
                                        {data.name}
                                    </li>
                                )
                            }
                        )
                    }
                </ul>

                <div className='grid grid-cols-4 gap-3 p-5'>
                    <SellerBox />
                </div>

                <h1 className='text-center text-blue-500 border-b-4 border-blue-500 font-bold w-[100px] mx-auto md:my-[80px] my-[40px]'>LOAD MORE</h1>
            </Container>
            <div className='w-full bg-[#2E90E5] md:relative'>
                <Container>
                    <div className='grid grid-cols-3 h-auto md:h-[600px]'>
                        <div className='md:col-span-1 col-span-3 h-full flex flex-col justify-center md:items-start items-center p-2 gap-5'>
                            <h1 className='md:text-[50px] text-[40px] text-white'>iPhone 6 Plus</h1>
                            <h1 className='md:text-[24px] text-[18px] text-center md:text-left text-white'>Performance and design. Taken right to the edge.</h1>
                            <h1 className='text-white text-[14px] border-b-2 border-white w-[75px]'>SHOP NOW</h1>
                        </div>
                        <div className='md:col-span-2 col-span-3 mt-5 md:mt-0'>
                            <img src="images/iPone6.png" className=" md:absolute md:bottom-0 md:end-20 " alt="" />
                        </div>
                    </div>
                </Container>

            </div>

            <Container>
                <div className='grid grid-cols-3 md:h-[500px] gap-10 pt-7'>
                    {
                        freeShipping.map(
                            (data, index) => {
                                return (
                                    <div className='md:col-span-1 col-span-3 flex flex-col justify-center items-center gap-5 p-5 md:p-0' key={index}>
                                        <img src={data.img} alt="" />
                                        <h1 className='text-[24px] font-bold'>{data.heading}</h1>
                                        <p className='text-[#22262A] text-[14px] text-center'>{data.descripsion}</p>
                                    </div>
                                )
                            }
                        )
                    }

                </div>
            </Container>
            <div className='w-full md:mb-[8rem] my-[4rem]'>
                <Container>
                    <Slider {...settings}>
                        {
                            footerData.map(
                                (d, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='flex h-[120px] gap-3 '>
                                                <img src={d.img} alt="" />
                                                <div className='flex flex-col gap-2 justify-center'>
                                                    <h1 className='text-[14px]  max-w-[150px]'>{d.title}</h1>
                                                    <div className='flex'>
                                                        <FaStar className='text-yellow-500' />
                                                        <FaStar className='text-yellow-500' />
                                                        <FaStar className='text-yellow-500' />
                                                        <FaStar className='text-yellow-500' />
                                                        <FaStar className='text-gray-400' />
                                                    </div>
                                                    <div className='text-[16px]'>
                                                        <span className='text-[#FF4858] me-2'>$499</span>
                                                        <span className="line-through text-[#C1C8CE]">$599</span>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    )
                                }
                            )
                        }
                    </Slider>
                </Container>

            </div>

        </>
    );
}

export default Home;
