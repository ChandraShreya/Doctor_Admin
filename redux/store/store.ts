import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import doctorSlice from "../slice/doctorSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        doctor:doctorSlice.reducer
    }
}
)