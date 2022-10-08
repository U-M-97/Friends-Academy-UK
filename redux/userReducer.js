import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { loginSuccess } = userSlice.actions
export default userSlice.reducer