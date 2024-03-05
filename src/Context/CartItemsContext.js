import { createContext } from "react";

export const CartItemsContext = createContext({
    items: [],
    totalAmount: 0,
    addFullItem: () => {},
    quantity: () => {},
    addBogofFlag: () => {},
    // addItem: () => {},
    // removeItem: () => {},
})
 
