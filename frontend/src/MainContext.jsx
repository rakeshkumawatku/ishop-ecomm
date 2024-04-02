import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContext = createContext();
const Main = (props) => {
    // console.log(process.env.REACT_APP_API_BASE_URL);
    // console.log(process.env.REACT_APP_API_CATEGORY_URL);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const apiCategoryUrl = process.env.REACT_APP_API_CATEGORY_URL;
    const apiColorUrl = process.env.REACT_APP_API_COLOR_URL;
    const apiProductUrl = process.env.REACT_APP_API_PRODUCT_URL;
    const apiUserUrl = process.env.REACT_APP_API_USER_URL;
    const apiOrderUrl = process.env.REACT_APP_API_ORDER_URL;

    const notify = (msg, flag) => toast(msg, { type: flag });

    const [category, setcategory] = useState([]);
    const [products, setProduct] = useState([]);
    const [color, setColor] = useState([]);


    const [productImgUrl, SetproductImgUrl] = useState();
    const [categoryImgUrl, SetcategoryImgUrl] = useState();
    const [Loader, setloader] = useState(false)
    const [filterCat, setfilterCat] = useState(null);


    const fetchProduct = async (id = null, limit = 0, category = null, color = null) => {
        if (id != null) {
            const response = await fetch(apiBaseUrl + apiProductUrl + "/" + id)
            const data = await response.json()
            return data;
        } else {
            const urlParams = new URLSearchParams({ limit, category, color })
            const resopnse = await fetch(apiBaseUrl + apiProductUrl + "?" + urlParams.toString());
            const data = await resopnse.json();
            return data;
        }
    }

    const fetchCategory = async (Id = null) => {
        if (Id != null) {
            const response = await fetch(apiBaseUrl + apiCategoryUrl + "/" + Id);
            const data = await response.json();
            return data;
        } else {
            const response = await fetch(apiBaseUrl + apiCategoryUrl);
            const data = await response.json();
            return data;
        }
    }

    const fetchproducts = () => {
        fetchCategory()
            .then(
                (success) => {
                    if (success.status == 1) {
                        setcategory(success.data)
                        SetcategoryImgUrl(success.fileBaseUrl)
                    } else {

                        setcategory([])
                    }
                }
            ).catch(
                (error) => {

                }
            )


        fetchProduct()
            .then(
                (success) => {
                    if (success.status == 1) {
                        setProduct(success.data)
                        SetproductImgUrl(success.fileBaseUrl)

                    } else {

                        setProduct([])
                    }
                }
            ).catch(
                (error) => {

                }
            )

    }


    useEffect(
        fetchproducts,
        []
    )







    const fetchColor = async (id = null) => {
        if (id != null) {
            const response = await fetch(apiBaseUrl + apiColorUrl + "/" + id);
            const data = await response.json();
            return data;
        } else {
            const response = await fetch(apiBaseUrl + apiColorUrl);
            const data = await response.json();
            return data;
        }

    }

    const fetchColorHandler = () => {
        fetchColor()
            .then(
                (success) => {
                    if (success.status == 1) {
                        setColor(success.data)
                    } else {
                        setColor([])
                    }
                }
            ).catch(
                (error) => {

                }
            )


    }

    useEffect(
        fetchColorHandler,
        []
    )

    return (
        <MainContext.Provider value={{ apiBaseUrl, apiCategoryUrl, notify, fetchCategory, setloader, apiColorUrl, fetchColor, apiProductUrl, fetchProduct, category, productImgUrl, categoryImgUrl, products, fetchproducts, setfilterCat, filterCat, color, fetchColorHandler, setProduct, apiUserUrl, apiOrderUrl,setcategory }}>
            <ToastContainer />
            <div className='Loader' style={{
                display: Loader ? "flex" : "none"
            }}
            >
                <h1>Loading....</h1></div>
            {props.children}
        </MainContext.Provider>
    );
}

export default Main;
export { MainContext };



