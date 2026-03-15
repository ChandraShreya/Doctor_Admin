// import axiosInstance from "@/api/axios/axios"
import { axiosInstance } from "@/api/axios/axios"
import { endpoints } from "@/api/endpoints/endpoints"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { log } from "console"
import { Cookie } from "next/font/google"
import { Cookies } from "react-cookie"

const initialState={
    loading:false,
    token:null

}
const cookie = new Cookies()
export const authSignIn = createAsyncThunk(
    "authSignIn",
    async(payload)=>{
        const response = await axiosInstance.post(endpoints.auth.signIn , payload)
        console.log(response)
        return response.data 
           
    }
);

export const logOut = createAsyncThunk(
    "logOut",
    async()=>{
        const response = await axiosInstance.post(endpoints.auth.logOut)
        return response.data
    }
)

const authSlice = createSlice({
    name:"authSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        /*sign in*/
        .addCase(authSignIn.pending,(state,{payload})=>{
            state.loading = true
        })
        .addCase(authSignIn.fulfilled,(state,{payload})=>{
            state.loading=false
        })
        .addCase(authSignIn.rejected,(state,{payload})=>{
            state.loading=false
        })

        /*log out*/
        .addCase(logOut.pending,(state,{payload})=>{
            state.loading = true

        })
        .addCase(logOut.fulfilled,(state,{payload})=>{
            state.loading = false
            state.token = null
            cookie.remove("token")

        })
        .addCase(logOut.rejected,(state,{payload})=>{
            state.loading = false

        })


    }

})

export default authSlice;
