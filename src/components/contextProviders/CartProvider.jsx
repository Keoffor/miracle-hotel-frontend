import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cartItems, setCartItems] = useState([]);
    const [customerId, setCustomerId] = useState("");

    //update customer cart Items
    const updateCart = (items) => {
        setCartItems(items);
        localStorage.setItem("customerCart", JSON.stringify(items));
    }
 
    //update customerId
    const updateCustomerId = (customerId) =>{
        setCustomerId(customerId);
        localStorage.setItem("customerId", customerId);
    }

    useEffect(() =>{
        const storeCart = localStorage.getItem("customerCart");
        if(storeCart){
            setCartItems(JSON.parse(storeCart));
        }
    },[]);

    useEffect(() =>{
        const cusId = localStorage.getItem("customerId");
        if(cusId){
            setCustomerId(cusId);
        }
    },[])
    return (
        <CartContext.Provider value={{cartItems,updateCart, updateCustomerId,customerId}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;