import "./MultiItemCard.css";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isEmpty } from "../../../utils";
import { toastr } from "../../../utils/toastr";
import { serverURL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { addWishItem, addCartItem } from "../../../store/slice/categorySlice";
import Rating from "@mui/material/Rating";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, Select, MenuItem } from "@mui/material";

const MultiItemCard = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // test
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDetails = (id) => {
    let strUrl = "/item/" + id;
    navigate(strUrl);
  };
  const handleChange = (event) => {
    setSize(event.target.value);
    console.log(event.target.value)
  };

  const handelQuantityIncrement = (event) => {
    setQuantity((prev) => (prev += 1));
  };

  const handelQuantityDecrement = (event) => {
    if (quantity > 1) {
      setQuantity((prev) => (prev -= 1));
    }
  };
  const handleAddToWishList = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    let params = { user_id: userInfo.id, product_id: props.item?.id };
    dispatch(addWishItem(params));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if(isEmpty(size)){
      toastr.warning("Select product size");
    }else{
      let params = { user_id: userInfo.id, product_id: props.item?.id, quantity: quantity, size: size };
      dispatch(addCartItem(params));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1300);
  };

  return (
    <div className="multi_product multi_product__card__card">
      <div className="multi_product__card__action">
        <IconButton
          onClick={handleAddToWishList}
          sx={{
            width: "40px",
            height: "40px",
            "&:hover": { background: "unset" },
          }}
        >
          <FavoriteBorderIcon
            sx={{
              fontWeight: "100",
              width: "30px",
              height: "35px",
              color: "black",
            }}
          />
        </IconButton>
      </div>
      <div className="multi_product__card">
        <div className="multi_product__image container cardcontainer">
          <button
            className="center-button"
            onClick={(e) => {
              e.preventDefault();
              handleDetails(props.item?.id);
            }}
          >
            Details
          </button>
          <img src={serverURL + props.item?.image} alt={props.item?.name} />
        </div>
        <div className="multi_product__card__detail">
          <div className="multi_product__name">{props.item?.cat_name}</div>
          <div className="multi_product__description">
            <span>{props.item?.name}</span>
          </div>
          <div className="multi_product_rating">
            <Rating
              name="half-rating"
              value={props.item?.ratings}
              precision={1}
            />
          </div>
          <div className="multi_product__price">
            <span className="itemfprice">₦ {props.item?.price}</span>
            {/* <span className="itemsprice">₦ {props.item?.price}</span> */}
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
          <div className="multi_add-to-cart">
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
                fontFamily: "Inter",
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

export default MultiItemCard;
