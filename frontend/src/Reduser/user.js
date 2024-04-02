import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice(
    {
        name: "user",
        initialState: {
            data: null
        },
        reducers: {
            loginuser: (currentSate, { payload }) => {
                currentSate.data = payload.user;
                localStorage.setItem("user", JSON.stringify(payload.user))
            },
            logout: (currentSate) => {
                currentSate.data = null;
                localStorage.removeItem('user')
            },
            lsToUser: (currentSate) => {
                const lsUser = localStorage.getItem("user");
                if (lsUser) {
                    currentSate.data = JSON.parse(lsUser);
                }
            }
        }
    }
)

export const { loginuser, logout, lsToUser } = UserSlice.actions;
export default UserSlice.reducer;