import "./CartCard.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from "@mui/material";

import {
  removeCartItem,
  quantityChange,
} from "../../../store/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { serverURL } from "../../../config";
import { addDotToNumber } from "../../../utils";

const CartCard = (props) => {
  const dispatch = useDispatch();
  console.log("propscartcard:", props.item)
  const handelQuantityIncrement = (event) => {
    let params = {
      id: props.item.id,
      user_id: props.item.user_id,
      product_id: props.item.product_id,
      quantity: Number(props.item.quantity) + 1,
    };
    dispatch(quantityChange(params));
    // cartItems.quantity(props.item.id, 'INC');
  };

  const handelQuantityDecrement = (event) => {
    if (props.item.quantity > 1) {
      let params = {
        id: props.item.id,
        user_id: props.item.user_id,
        product_id: props.item.product_id,
        quantity: Number(props.item.quantity) - 1,
      };
      dispatch(quantityChange(params));
      // cartItems.quantity(props.item.id, 'DEC');
    }
  };

  const handelRemoveItem = () => {
    let params = {
      id: props.item.id,
      user_id: props.item.user_id,
      product_id: props.item.product_id,
    };
    dispatch(removeCartItem(params));
  };


  return (
    <div className="cart__item__card">
      <div className="cart-horizontal-line"></div>
      <div className="remove__item__icon">
        <IconButton onClick={handelRemoveItem}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="cart__item__detail">
        <div className="cart__item__image">
          <img
            src={serverURL + props.item.image}
            alt="item"
            className="item__image"
          />
        </div>
      </div>
      <div className="cart__item__name">{props.item.name}</div>
      <div className="cart__item__size">{props.item.size}</div>
      <div className="cart__item__price">₦{addDotToNumber(props.item.price)}</div>
      <div className="cart__item__quantity">
        <IconButton onClick={handelQuantityIncrement}>
          <AddCircleIcon />
        </IconButton>
        <div type="text" name="quantity" className="quantity__input">
          {props.item.quantity}
        </div>
        <IconButton onClick={handelQuantityDecrement}>
          <RemoveCircleIcon fontSize="medium" />
        </IconButton>
      </div>
      <div className="cart__item__subtotal__price">₦{addDotToNumber(props.item.price * props.item.quantity)}</div>
    </div>
  );
};

export default CartCard;
