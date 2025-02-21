import {createContext, useState } from "react";

export const CheckOutContext = createContext(null);

export const CheckoutProvider = ({children}) => {
    const[checkOutState, setCheckOutState] = useState("")

    return (
        <CheckOutContext.Provider value={{checkOutState, setCheckOutState}}>
            {children}
        </CheckOutContext.Provider>
    )
}

