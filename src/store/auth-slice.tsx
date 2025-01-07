import { createSlice } from "@reduxjs/toolkit";

const loadUser = ()=>{
    const user = localStorage.getItem("authUser")
    return user ? JSON.parse(user) : null
} //from local storage

const authSlice = createSlice({
    name : "auth",
    initialState : {user : loadUser()},
    reducers : {
        setUser : (state,action)=>{
            state.user = action.payload
            localStorage.setItem("authUser", JSON.stringify(action.payload))
        },
        removeUser : (state)=>{
            state.user = null
            localStorage.removeItem("authUser")
        }
    }
})

export const {setUser, removeUser} = authSlice.actions
export default authSlice.reducer
