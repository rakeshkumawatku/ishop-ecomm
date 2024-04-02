import React from 'react';
import Container from './Container';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Footer = () => {
    const FooterData = [
        {
            name: "Infomation",
            children: [
                {
                    name: 'About Us'
                },
                {
                    name: 'Infomation'
                },
                {
                    name: 'Privacy Policy'
                },
                {
                    name: 'Terms & Conditions'
                }
            ]
        }, {
            name: "Service",
            children: [
                {
                    name: 'About Us'
                },
                {
                    name: 'Infomation'
                },
                {
                    name: 'Privacy Policy'
                },
                {
                    name: 'Terms & Conditions'
                }
            ]
        }, {
            name: "Extras",
            children: [
                {
                    name: 'About Us'
                },
                {
                    name: 'Infomation'
                },
                {
                    name: 'Privacy Policy'
                },
                {
                    name: 'Terms & Conditions'
                }
            ]
        }, {
            name: "My Account",
            children: [
                {
                    name: 'About Us'
                },
                {
                    name: 'Infomation'
                },
                {
                    name: 'Privacy Policy'
                },
                {
                    name: 'Terms & Conditions'
                }
            ]
        }, {
            name: "Userful Links",
            children: [
                {
                    name: 'About Us'
                },
                {
                    name: 'Infomation'
                },
                {
                    name: 'Privacy Policy'
                },
                {
                    name: 'Terms & Conditions'
                }
            ]
        }, {
            name: "Our Offers",
            children: [
                {
                    name: 'About Us'
                },
                {
                    name: 'Infomation'
                },
                {
                    name: 'Privacy Policy'
                },
                {
                    name: 'Terms & Conditions'
                }
            ]
        }

    ]
    return (
        <div>
            <div className='w-full md:py-5 py-8 border-t-2 border-gray-100 '>
                <Container>
                    <div className='grid grid-cols-3 gap-6 justify-center px-[50px] md:px-[20px] text-center md:text-left'>
                        <div className='md:col-span-1 col-span-3 flex flex-col gap-3 md:gap-0'>
                            <h1 className='text-[#C1C8CE] md:text-[40px] text-[30px]  font-bold'>iSHOP</h1>
                            <p className='text-[#22262A] text-[12px]'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat ad in laudantium deleniti exercitationem facilis recusandae ipsa! Officiis voluptatem provident in vero delectus   </p>

                        </div>

                        <div className='flex flex-col justify-center  gap-3 my-[19px] md:col-span-1 col-span-3'>
                            <h1 className='text-[#22262A] md:text-[18px] text-[16px] font-bold'>Follow Us</h1>
                            <p className='text-[#22262A] text-[12px] pe-8'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat ad in laudantium deleniti exercitationem </p>
                            <div className='flex gap-3 mt-5 mx-auto md:mx-0'>
                                <FaFacebookF className='text-blue-800' />
                                <FaTwitter className='text-blue-500' />
                            </div>

                        </div>
                        <div className='md:flex flex-col mt-4  gap-3 md:col-span-1 col-span-3 hidden'>
                            <h1 className='text-[#22262A] md:text-[18px] text-[16px]  font-bold'>Contect Us</h1>
                            <p className='text-[#22262A] text-[12px] md:pe-[150px]'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat ad in laudantium deleniti exercitationemd exercitationem</p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className='w-full md:pt-10 border-gray-100  border-b-2'>
                <Container>
                    <div className='grid md:grid-cols-6 grid-cols-1 border-t-2 py-8 border-gray-100'>
                        {
                            FooterData.map(
                                (data, index) => {
                                    return (
                                        <div className='md:col-span-1 col-span-6 mx-auto text-center' key={index}>
                                            <h1 className='text-[#22262A] text-[18px] mt-3 font-bold'>{data.name}</h1>
                                            <ul className='md:flex hidden flex-col gap-3 text-[#262626] text-[14px] mt-8'>
                                                {
                                                    data.children.map(
                                                        (child, i) => {
                                                            return <li key={i}>{child.name}</li>
                                                        }
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </Container>
            </div>
            <Container>

                <div className='md:col-span-1 md:hidden  col-span-6 mx-auto text-center my-5 px-[80px]'>
                    <h1 className='text-[#22262A] md:text-[18px] text-[16px]  font-bold'>Contect Us</h1>
                    <p className='text-[#22262A] text-[12px] md:pe-[150px]'>iShop: address @building 124 Call Us now:0123-456-789 Email:support@whatever.com</p>
                </div>
                <div className='flex gap-3 my-10 md:justify-end justify-center'>
                    <img src="images/Western_union.png" alt="" />
                    <img src="images/master_card.png" alt="" />
                    <img src="images/Paypal.png" alt="" />
                    <img src="images/visa.png" alt="" />
                </div>
            </Container>


        </div>

    );
}

export default Footer;
