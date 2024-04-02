import React, { useContext, useEffect } from 'react';
import Container from '../../Components/Website/Container';
import { MainContext } from '../../MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { changeQty, emptyCart } from '../../Reduser/cart';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const dispatcher = useDispatch();
    const { products, apiBaseUrl, productImgUrl, apiUserUrl } = useContext(MainContext);
    const data = useSelector(store => store.cart.data)
    const user = useSelector(store => store.user)
    const navigater = useNavigate();

    const cart = useSelector(
        (store) => {
            return store.cart
        }
    )

    const checkOut = () => {
        if (user.data == null) {
            navigater("/login?ref=checkout")
        } else {
            navigater("/checkout")
        }
    }
    // let total = '';

    const changeCartqty = (pId, qty) => {
        if (user.data != null) {
            axios.get(apiBaseUrl + apiUserUrl + "/change_Cart_qty/" + user.data._id + "/" + pId + "/" + qty)
                .then(() => { }).catch(() => { })
        }
    }

    const table = [];
    for (let p of products) {
        const found = data.find(i => i.pId == p._id)
        if (found) {
            // total = p.discount_price * found.qty;
            table.push(<tr key={p._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 cursor-pointer font-bold text-center text-xl text-red-600">X</td>
                <td>

                    <img className={`object-cover aspect-square w-[200px] px-6 py-4 cursor-pointer font-bold text-black text-center text-xl`} src={apiBaseUrl + productImgUrl + p.image} alt="" />
                </td>

                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {p.name}
                </th>
                <td className="px-6 py-4">{p.discount_price}</td>
                <td className="px-6 py-4 h-[300px] flex justify-start items-center gap-3">
                    <button onClick={() => {
                        dispatcher(changeQty({ pId: p._id, flag: 2, price: p.discount_price }))
                        changeCartqty(p._id, found.qty - 1)
                    }} className='p-3 shadow  rounded-lg bg-blue-500 text-white'>
                        -
                    </button>
                    <div className='p-3 border w-[20%]  text-center pe-6'>
                        {found.qty}
                    </div>
                    <button onClick={() => {
                        dispatcher(changeQty({ pId: p._id, flag: 1, price: p.discount_price }))
                        changeCartqty(p._id, found.qty + 1)
                    }} className='p-3 shadow rounded-lg bg-blue-500 text-white'>
                        +
                    </button>
                </td>
                <td className="px-6 py-4">{p.price * found.qty}</td>
            </tr>)
        }
    }
    return (
        <>
            <Container>
                <div className='w-full p-3 bg-[#F6F7F8] text-center my-3 select-none'>Cart</div>
                <div className="relative overflow-x-auto my-[50px]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th></th>
                                <th scope="col" className="px-6 py-3">
                                    Product Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 ">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                </div>

            </Container>
            <Container>
                <div className='flex justify-between my-[200px] select-none '>
                    <div className='w-[30%]'>
                        <div className=''>
                            <input type="text" className='shadow outline-none p-3' placeholder='Voucher code' />
                            <button className='p-3 bg-[#33A0FF] text-white'>Redeem</button>
                        </div>
                    </div>
                    <div className='w-[30%]  font-bold'>
                        <div className='flex justify-between p-3'>
                            <div>
                                Cupon
                            </div>
                            <div>
                                No
                            </div>
                        </div>
                        <hr className='my-[20px] bg-[#F6F7F8] block' />
                        <div className='flex justify-between p-3 text-[30px]'>
                            <div>
                                Total
                            </div>
                            <div>
                                ₹ {cart.total}
                            </div>
                        </div>
                        <button onClick={checkOut} className='bg-[#33A0FF] w-full p-5 text-[16px] text-white font-bold rounded-lg mt-3'>Check out</button>
                    </div>

                </div>
            </Container>
        </>

    );
}

export default Cart;
