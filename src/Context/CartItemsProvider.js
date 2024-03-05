import { useEffect, useState } from "react";
import { CartItemsContext } from "./CartItemsContext";

const CartItemsProvider = (props) => {

    let [cartItems, setCartItems] = useState([])
    let [totalAmountOfItems, setTotalAmountOfItems] = useState(0)
    let [bogofFlag, setBogofFlag] = useState(false);
    
    // const addToCartHandler = (item, quantity) => {
    //     const { id, name, price, image, category } = item;
    //     removeFromCartHandler(item)
    //     setCartItems((prevItems) => [...prevItems, { id, name, price, image, category, quantity: quantity }])
    // }

    const addToFullCartHandler = (items) => {
        setCartItems(items);
    }
    const addToBogofFlag = () => {
        console.log("addToBogofFlag")
        setBogofFlag(true)
    }
    const removeFromCartHandler = (item) => {
        setCartItems(cartItems.filter((prevItem) => prevItem.id !== item.id))
    }

    const calculateTotalAmount = (currentCartItems) => {
        let total = 0
        currentCartItems.forEach((item) => {
            total = total + (item.price * item.quantity)
        })
        setTotalAmountOfItems(total)
    }

    const quantityHandler = (itemId, action) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === itemId) {
                    if (action === 'INC') {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                }
                return item;
            });
        });
    };

    useEffect(() => {
        console.log("bogofflat", bogofFlag)
        if(bogofFlag === false){
            calculateTotalAmount(cartItems)
        }
    }, [cartItems])


    const cartItemCtx = {
        items: cartItems,
        totalAmount: totalAmountOfItems,
        addFullItem: addToFullCartHandler,
        addBogofFlag:addToBogofFlag,
        quantity: quantityHandler
        // addItem: addToCartHandler,
        // removeItem: removeFromCartHandler,
    }

    return (
        <CartItemsContext.Provider value={cartItemCtx}>
            {props.children}
        </CartItemsContext.Provider>
    );
}

export default CartItemsProvider;