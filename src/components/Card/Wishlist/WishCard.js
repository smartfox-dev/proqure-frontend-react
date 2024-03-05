import { useContext, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";
import "./WishCard.css";
import { Button } from "@mui/material";

import { WishItemsContext } from "../../../Context/WishItemsContext";
import { CartItemsContext } from "../../../Context/CartItemsContext";

import { isEmpty } from "../../../utils";
import { removeWishItem } from "../../../store/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCartItem } from "../../../store/slice/categorySlice";
import { serverURL } from "../../../config";

const WishCard = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo)
  const wishItems = useContext(WishItemsContext);
  const wishItemList = useSelector((state) => state.category.wishList);
  const cartItemList = useSelector((state) => state.category.cartList);
  const wishItemsContext = useContext(WishItemsContext);
  const cartItemsContext = useContext(CartItemsContext);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handelRemoveItem = () => {
    let params = {
      id: props.item.id,
      user_id: userInfo.id,
      product_id: props.item.product_id,
    };
    dispatch(removeWishItem(params));
  };

  const handelAddToCart = () => {
    let params = {
      user_id: props.item.user_id,
      product_id: props.item.product_id,
      quantity: 1,
      size: props.item?.size.split(",")[0],
      delay: 0,
    };
    console.log("hadleAddCart:", params)
    dispatch(addCartItem(params));
    // wishItems.addToCart(props.item)
  };

  useEffect(() => {
    if (isAuthenticated) {
      wishItemsContext.addFullItem(wishItemList);
      cartItemsContext.addFullItem(cartItemList);
    } else {
      wishItemsContext.addFullItem([]);
      cartItemsContext.addFullItem([]);
    }
  }, [wishItemList, cartItemList]);

  return (
    <div className="wishcard">
      <div className="wish__item__image">
        <img
          src={serverURL + props.item.image}
          alt="item"
          className="wish__image"
        />
      </div>
      <div className="wishcardcontainer">
        <div className="wishcardtextcontainer">
          <div className="wish__item__name">{props.item.name}</div>
          <div className="wish__item__price">₦{props.item.price}</div>
        </div>
        <div className="add__to__cart">
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              handelAddToCart();
            }}
            sx={[
              {
                "&:hover": {
                  backgroundColor: "#3C50E0",
                  borderColor: "#3C50E0",
                },
                borderColor: "#a3ba71",
                backgroundColor: "#a3ba71",
                color: "white",
                fontSize: "10px",
              },
            ]}
          >
            🛒Add to cart
          </Button>
        </div>
        <div className="wish__remove__item__icon">
          <IconButton onClick={handelRemoveItem} style={{ padding: "2px" }}>
            <HighlightOffIcon style={{ fill: "#04aa6d" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
