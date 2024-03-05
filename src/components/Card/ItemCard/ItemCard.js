import "./ItemCard.css";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { isEmpty } from "../../../utils";
import { toastr } from "../../../utils/toastr";
import { serverURL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { addWishItem, addCartItem } from "../../../store/slice/categorySlice";
import Rating from "@mui/material/Rating";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, IconButton, MenuItem, Select } from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

const ItemCard = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const wishItemList = useSelector((state) => state.category.wishList);
  const cartItemList = useSelector((state) => state.category.cartList);
  const wishItems = useContext(WishItemsContext);
  const cartItems = useContext(CartItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDetails = (id) => {
    let strUrl = "/item/" + id;
    navigate(strUrl);
  };

  const handleAddToWishList = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    let params = { user_id: userInfo.id, product_id: props.item.id };
    dispatch(addWishItem(params));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (isEmpty(size)) {
      toastr.warning("Select product size");
    }else{
      let params = { user_id: userInfo.id, product_id: props.item?.id, quantity: quantity, size: size };
      dispatch(addCartItem(params));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1300);
  };

  const handelQuantityIncrement = (event) => {
    setQuantity((prev) => (prev += 1));
  };

  const handelQuantityDecrement = (event) => {
    if (quantity > 1) {
      setQuantity((prev) => (prev -= 1));
    }
  };
  
  const handleChange = (event) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      wishItems.addFullItem(wishItemList);
      cartItems.addFullItem(cartItemList);
    } else {
      wishItems.addFullItem([]);
      cartItems.addFullItem([]);
    }
  }, [wishItemList, cartItemList]);

  return (
    <div className="product product__card__card">
      <div className="product__card">
        <div className="product__image container cardcontainer">
          <button
            className="center-button"
            onClick={(e) => {
              e.preventDefault();
              handleDetails(props.item.id);
            }}
          >
            Details
          </button>
          <img src={serverURL + props.item.image} alt={props.item.name} />
        </div>
        <div className="product__card__detail">
          <div
            onClick={(e) => {
              e.preventDefault();
              handleDetails(props.item.id);
            }}
            className="product__name"
          >
            <span>{props.item.name}</span>
          </div>
          <div className="product_rating">
            <Rating
              name="half-rating"
              value={props.item.ratings}
              precision={1}
            />
            <span className="multi-rating-text ml-2">
              ({props.item.reviews_count} ratings)
            </span>
          </div>
          <div className="product__price">
            <span className="itemfprice">₦ {props.item?.price}</span>
            <span className="itemsprice">₦ {props.item?.price}</span>
          </div>
          <div className="multi-product-control">
            <FormControl
              sx={{ m: 1, width: 130, margin: "0", marginRight: 1.5 }}
            >
              <span className="text-left">Size:</span>
              <Select
                className="multi-product-select"
                value={size}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">None</MenuItem>
                {props.item?.size &&
                  props.item?.size.split(",").map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div className="multi_product__quantity__and__size">
              <span className="text-left d-flex">Qunatity:</span>
              <div className="multi_product__quantity">
                <IconButton onClick={handelQuantityDecrement}>
                  <RemoveSharpIcon fontSize="medium" style={{ width: 20 }} />
                </IconButton>
                <div
                  type="text"
                  name="quantity"
                  className="multi_quantity__input"
                >
                  {quantity}
                </div>
                <IconButton onClick={handelQuantityIncrement}>
                  <AddSharpIcon style={{ width: 20 }} />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="add-to-cart">
            <LoadingButton
              loading={isLoading}
              startIcon={
                isLoading && <CircularProgress size={20} color="inherit" />
              }
              sx={{
                color: "#fff",
                bgcolor: "#04AA6D",
                "&:hover": {
                  bgcolor: "#0ebb7c",
                },
                textalign: "center",
                alignself: "center",
                width: "100%",
                fontSize: "20px",
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsLoading(true);
                handleAddToCart();
              }}
            >
              <span className="ml-1">Add to cart</span>
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
