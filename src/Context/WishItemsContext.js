import { createContext } from "react";

export const WishItemsContext = createContext({
    items: [],
    addFullItem: () => {},
    addToCart: () => {},
    // addItem: () => {},
    // removeItem: () => {},
})
 
