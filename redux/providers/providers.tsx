"use client"
import { Provider } from "react-redux"
import { store } from "../store/store"
import { Toaster } from "sonner"


type ProviderProps={
    children:React.ReactNode
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