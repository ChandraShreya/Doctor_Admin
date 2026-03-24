import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import doctorSlice from "../slice/doctorSlice";
import locationSlice from "../slice/locationSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        doctor:doctorSlice.reducer,
        location:locationSlice.reducer
    }
}
)