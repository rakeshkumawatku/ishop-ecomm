import { configureStore } from '@reduxjs/toolkit'
import CartReducer from "./Reduser/cart"
import UserReducer from "./Reduser/user"
import AdminReducer from "./Reduser/admin"

const store = configureStore(
    {
        reducer: {
            cart: CartReducer,
            user: UserReducer,
            admin: AdminReducer,
        }
    }
)

export default store;