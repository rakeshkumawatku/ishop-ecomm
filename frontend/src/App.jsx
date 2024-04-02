import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WebsiteMain from "./Pages/Website/Main";
import Home from "./Pages/Website/Home";
import Store from "./Pages/Website/Store";
import Cart from "./Pages/Website/Cart";
import Dasboard from "./Pages/Admin/Dasboard";
import AdminMain from "./Pages/Admin/Main";
import CategoryAdd from "./Pages/Admin/Category/Add";
import CategoryView from "./Pages/Admin/Category/View";
import ColorAdd from "./Pages/Admin/Color/Add";
import ColorView from "./Pages/Admin/Color/View";
import ProductAdd from "./Pages/Admin/Products/Add";
import ProductView from "./Pages/Admin/Products/View";
import ProductEdit from "./Pages/Admin/Products/edit"
import Notefound from "./Pages/Admin/Notefound";
import Edit from "./Pages/Admin/Category/edit";
import Coloredit from "./Pages/Admin/Color/edit"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { lsToCart } from "./Reduser/cart";
import Login from "./Pages/Website/Login";
import AdminLogin from './Pages/Admin/Login'
import Register from "./Pages/Website/Register";
import { lsToUser } from "./Reduser/user";
import Checkout from "./Pages/Website/checkout";
import Ordersummary from "./Pages/Website/Ordersummary";
import Transaction from "./Pages/Admin/Transaction";
import Order from "./Pages/Admin/Order";

function App() {
  const dispachre = useDispatch();

  useEffect(
    () => {
      dispachre(lsToCart());
      dispachre(lsToUser())
    },
    []
  )

  const routes = createBrowserRouter(
    [
      {
        path: '/',
        element: <WebsiteMain />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "store/:category_slug?",
            element: <Store />
          },
          {
            path: "cart",
            element: <Cart />
          },
          {
            path: "checkout",
            element: <Checkout />
          },
          {
            path: "order-summary/:order_id",
            element: <Ordersummary />
          }
        ]
      },
      {
        path: '/admin',
        element: <AdminMain />,
        children: [
          {
            path: '',
            element: <Dasboard />
          },
          {
            path: 'transaction',
            element: <Transaction />
          },
          {
            path: 'order',
            element: <Order />
          },
          {
            path: 'category',
            children: [
              {
                path: 'add',
                element: <CategoryAdd />
              },
              {
                path: "view",
                element: <CategoryView />
              },
              {
                path: "edit/:id",
                element: <Edit />
              }

            ]
          },
          {
            path: 'product',
            children: [
              {
                path: 'add',
                element: <ProductAdd />
              },
              {
                path: "view",
                element: <ProductView />
              }, {
                path: "edit/:id",
                element: <ProductEdit />
              }
            ]
          },
          {
            path: 'color',
            children: [
              {
                path: 'add',
                element: <ColorAdd />
              },
              {
                path: "view",
                element: <ColorView />
              }, {
                path: "edit/:id",
                element: <Coloredit />
              }
            ]
          }
          ,
          {
            path: '*',
            element: <Notefound />
          }
        ]
      },
      {
        path: "/admin/login",
        element: <AdminLogin />

      },
      {
        path: "/login",
        element: <Login />
      }, {
        path: "/signup",
        element: <Register />
      }
    ]
  )
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
