import { createSlice } from "@reduxjs/toolkit"

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.admin = action.payload
        },
        logout: (state) => {
            state.admin = null
        },
    }
})

export const { loginSuccess, logout } = adminSlice.actions
export default adminSlice.reducer