import { createSlice } from "@reduxjs/toolkit";


const AdminSlice = createSlice(
    {
        name: "admin",
        initialState: {
            data: null
        },
        reducers: {
            loginAdmin: (currentSate, { payload }) => {
                currentSate.data = payload.admin;
                localStorage.setItem("admin", JSON.stringify(payload.admin))
            },
            logout: (currentSate) => {
                currentSate.data = null;
                localStorage.removeItem('admin')
            },
            lsToAdmin: (currentSate) => {
                const lsAdmin = localStorage.getItem("admin");
                if (lsAdmin) {
                    currentSate.data = JSON.parse(lsAdmin);
                }
            }
        }
    }
)

export const { loginAdmin, logout, lsToAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;