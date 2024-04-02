import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            data: [],
            total: 0
        },
        reducers: {
            AddToCart: (currentSate, { payload }) => {
                const data = currentSate.data
                const findData = currentSate.data.find(d => d.pId == payload.pId)
                if (findData) {
                    findData.qty++
                } else {
                    data.push({
                        pId: payload.pId,
                        qty: 1
                    })
                }
                currentSate.total += payload.price;
                localStorage.setItem("cart", JSON.stringify(currentSate))
            },
            changeQty: (currentSate, { payload }) => {
                let foundIndex = null;
                const found = currentSate.data.find(
                    (item, index) => {
                        if (item.pId == payload.pId) {
                            foundIndex = index;
                            return true;
                        } else {
                            return false;
                        }
                    }

                );
                if (found) {
                    if (payload.flag == 1) {
                        found.qty++;
                        currentSate.total += payload.price
                    } else {
                        if (found.qty == 1) {
                            currentSate.data.splice(foundIndex, 1)
                        } else {
                            found.qty--;
                        }
                        currentSate.total -= payload.price
                    }
                }
                localStorage.setItem("cart", JSON.stringify(currentSate))
            },
            removeFromCart: (currentSate) => {

            },
            emptyCart: (currentSate) => {
                currentSate.data = [];
                currentSate.total = 0;
                localStorage.removeItem("cart")

            },
            lsToCart: (currentSate) => {
                const lsCart = localStorage.getItem("cart");
                if (lsCart != undefined) {
                    const { data, total } = JSON.parse(lsCart);
                    currentSate.data = data;
                    currentSate.total = total;
                }
            },
            dbToSate: (currentSate, { payload }) => {
                const { total, CartData } = payload;
                currentSate.data = CartData;
                currentSate.total = total;
                localStorage.setItem("cart", JSON.stringify(currentSate))

            }
        }
    }
)

export const { AddToCart, removeFromCart, emptyCart, lsToCart, changeQty, dbToSate } = cartSlice.actions;
export default cartSlice.reducer;

