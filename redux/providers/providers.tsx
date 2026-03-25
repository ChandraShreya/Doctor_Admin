"use client"

import { Provider } from "react-redux"
import { Toaster } from "sonner"
import { store } from "../store/store"




type ProviderProps={
    children:ReactNode
}
export default function Providers({children}:ProviderProps){
    return(
        <>
        <Provider store ={store}>
            {children}
            <Toaster position="top-center"
            //   theme="dark"
              richColors
              duration={3000} />

        </Provider>
        </>
    )
}