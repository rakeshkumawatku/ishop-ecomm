import React, { useEffect, useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { FaCaretDown } from "react-icons/fa6";
import { FaSitemap } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoIosColorPalette } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import { FaBorderAll } from "react-icons/fa";
import { useSelector } from 'react-redux';


const SideBar = () => {
    const [active, setactive] = useState(0);
    const [highlight, sethighlight] = useState('Dashboard')
    const navigator = useNavigate();

    const { admin } = useSelector(store => store);

    // useEffect(
    //     () => {
    //         if (admin.data == null) {
    //             navigator("/admin/login")
    //         }
    //     }, []
    // )


    const items = [
        {
            name: "Dashboard",
            icon: <MdDashboard />,
            url: '/admin',
            children: []
        },
        {
            name: "Category",
            icon: <BiCategory />,
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/category/add"
                },
                {
                    name: "View",
                    url: "/admin/category/view"
                }

            ]
        },
        {
            name: "Product",
            icon: <FaSitemap />,
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/product/add"
                },
                {
                    name: "View",
                    url: "/admin/product/view"
                }

            ]
        },
        {
            name: "Color",
            icon: <IoIosColorPalette />,
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/color/add"
                },
                {
                    name: "View",
                    url: "/admin/color/view"
                }

            ]
        }, {
            name: "Transaction",
            icon: <GrTransaction />,
            url: '/admin/transaction',
            children: []
        }, {
            name: "Order",
            icon: <FaBorderAll />,
            url: '/admin/order',
            children: []
        }
    ]
    return (
        <div className='bg-gradient-to-r from-pink-500 to-indigo-600 select-none    '>
            <div className='text-3xl text-white font-bold font-serif text-center '>
                <img src="/images/admin.png" className='mx-auto my-4' width={"50%"} alt="" />
                <h1>Admin Panel</h1>
                <hr className='text-white my-5' />
            </div>
            <div >
                {
                    items.map(
                        (d, index) => {
                            return <Listitems activeHandler={setactive} highlight={highlight} sethighlight={sethighlight} active={active} index={index} items={d} key={index} />
                        }
                    )
                }
            </div>
        </div>
    );
}

export default SideBar;

const Listitems = ({ items, activeHandler, active, index, highlight, sethighlight }) => {
    return (
        <div className='px-5'>
            {
                items.children.length == 0
                    ?
                    < Link to={items.url} >
                        <li onClick={() => {
                            sethighlight(items.name)
                            activeHandler(index)
                        }} className={`${active == index ? "text-white" : ""} flex items-center mb-2 gap-4 text-xl font-bold text-gray-400 ms-4 leading-10 hover:text-white`}>
                            {items.icon}
                            {items.name}
                        </li>
                    </Link >
                    :
                    <li onClick={() => {
                        sethighlight(items.name)
                        if (active == index) {
                            activeHandler(null);
                        } else {
                            activeHandler(index)
                        }
                    }
                    } className={` select-none flex items-center relative gap-4 text-xl flex-wrap font-bold text-gray-400 cursor-pointer ms-4  hover:text-white ${active == index ? "text-white" : ""} ${highlight == items.name ? "text-white" : ""}`}>
                        {items.icon}
                        {items.name}
                        <FaCaretDown className={`  duration-300 absolute right-10 top-3 ${active == index ? "rotate-180" : "rotate-0"}`} />
                        <ul className={`w-full bg-white  rounded-xl duration-500 mx-3 origin-top overflow-hidden ${active == index ? "scale-y-100 p-2 opacity-100" : "scale-y-0 p-0 h-0 opacity-0"}`}>
                            {
                                items.children.map(
                                    (d, i) => {
                                        return <Link to={d.url} key={i} onClick={(e) => {
                                            e.stopPropagation()
                                        }}>
                                            <li className='font-bold text-black'>{d.name}</li>
                                        </Link>

                                    }
                                )
                            }
                        </ul>
                    </li>
            }


        </div>

    )
}


//


// 