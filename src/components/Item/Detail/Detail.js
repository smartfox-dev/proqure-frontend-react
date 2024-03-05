import { useContext, useState } from "react";
import "./Detail.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import headerImg from "../../../assets/images/header.png";
import bnpVerticalImg from "../../../assets/images/bnpvertical.png";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addWishItem, addToBagItem } from "../../../store/slice/categorySlice";
import { addDotToNumber } from "../../../utils";
import { useEffect } from "react";
import DetailTopImg from "../../../assets/images/itemview/detailtop.png";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "fixed", // Use fixed position for the modal
  top: "55%", // Set top position to 50%
  left: "50%", // Set left position to 50%
  transform: "translate(-50%, -50%)", // Use translate to center the modal
  minWidth: "450px",
  width: "550px",
  height: "680px",
  bgcolor: "background.paper",
  border: "2px solid #04AA6D",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
};

const Detail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.userInfo)
  const [quantity, setQuantity] = useState(1);
  const wishItemList = useSelector((state) => state.category.wishList);
  const cartItemList = useSelector((state) => state.category.cartList);
  const wishItems = useContext(WishItemsContext);
  const cartItems = useContext(CartItemsContext);

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  console.log("propsitem:", props.item);
  const handelQuantityIncrement = (event) => {
    setQuantity((prev) => (prev += 1));
  };

  const handelQuantityDecrement = (event) => {
    if (quantity > 1) {
      setQuantity((prev) => (prev -= 1));
    }
  };

  const handelAddToWish = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    let params = { user_id:userInfo.id, product_id: props.item.id };
    console.log("params", params);
    dispatch(addWishItem(params));
  };

  const handelAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    let params = {
      user_id: userInfo.id,
      product_id: props.item.id,
      quantity: quantity,
    };
    console.log("addcartdetailparams", params);
    dispatch(addToBagItem(params));
  };

  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    let params = {
      user_id: userInfo.id,
      product_id: props.item.id,
      quantity: quantity,
    };
    console.log("addcartdetailparams", params);
    dispatch(addToBagItem(params));
    navigate("/cartlist");
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
    <div className="product__detail__container">
      <Modal open={openModal} /*onClose={handleModalClose} */>
        <Box sx={style} className="bnmodalbody">
          <div className="d-flex justify-content-center align-items-center">
            <div className="bnmodalclose" onClick={handleModalClose}>
              <CloseIcon />
            </div>
            <div className="bnmodalimg">
              <img src={headerImg} alt="" />
            </div>
          </div>
          <div>
            <div className="bnmodalheader">Buy Now Pay Later With Proqure</div>
            <div className="bnmodalcontent">
              Purchase a product on proqure and split the payment between 5 and
              7 days
            </div>
          </div>
          <div className="bnpvertialcontainter">
            <div className="bnpcontainerlect">
              <img src={bnpVerticalImg} alt="" />
            </div>

            <div className="bnpcontainerright">
              <div className="bnprow">
                <div>Add item(s) to your cart</div>
              </div>
              <div className="bnprow">
                <div>Go to checkout and seleclt buy now pay later</div>
              </div>
              <div className="bnprow">
                <div>Select your desired BNPL duration</div>
              </div>
              <div className="bnprow">
                <div>Proceed to place your order</div>
              </div>
              <div className="bnprow">
                <div>Your order is processed</div>
              </div>
            </div>
          </div>
          <div className="bnpmodalbuttonroot">
            <button className="bnpmodalbutton" onClick={handleModalClose}>
              DONE
            </button>
          </div>
        </Box>
      </Modal>
      <div className="product__detail">
        <div onClick={ (e) => { 
          setTimeout(() => {
            handleModalOpen();
          }, 300); 
        }}>
          <img
            src={DetailTopImg}
            className="detailtopimg"
            alt="detailtopimg.png"
          />
        </div>
        <div className="product__main__detail">
          <div className="product__name__main">{props.item.name}</div>
          <div className="product__detail__rating">
            <Rating
              className="detailrating"
              name="half-rating"
              value={props.item.ratings}
              precision={0.1}
            />
            <div className="detailfive">({props.item.reviews_count})</div>
            <div className="vertical-line"></div>
            <div className="status">
              <span className="detail-status">Status:</span>
              <span className="detail-status-value"> In stock</span>
            </div>
          </div>
          <div className="product__price__detail">
            ₦{addDotToNumber(props.item.price)}
          </div>
          <div className="horizontal-line"></div>
          <div className="product__detail__description">
            {props.item.description}
          </div>
          <div className="product__color">
            <div className="product-color-label">Quantity</div>
            <div className="product__quantity__and__size">
              <div className="product__quantity">
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
          <div className="detailcallall">
            <div className="detailcall">Call us for bulk order</div>
            <div className="detailclick">Click here to show phone number</div>
          </div>
          <div className="horizontal-line"></div>
        </div>
        <form className="product__form">
          <div className="collect__item__actions">
            <div className="add__cart__add__wish">
              <div className="add__cart">
                <button
                  className="detailaddbutton"
                  onClick={(e) => {
                    e.preventDefault();
                    handelAddToCart();
                  }}
                >
                  <div className="d-flex">
                    <AddIcon style={{ width: "15px" }} />
                    <span className="m-auto">Add to cart</span>
                  </div>
                </button>
                <button
                  className="detailbuynow"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuy();
                  }}
                >
                  Buy Now
                </button>
                <div className="add__wish">
                  <IconButton
                    variant="outlined"
                    size="large"
                    sx={[
                      {
                        "&:hover": {
                          backgroundColor: "#d9d9d9",
                          borderColor: "#d9d9d9",
                          borderWidth: "3px",
                          color: "grey",
                        },
                        borderColor: "#d9d9d9",
                        backgroundColor: "#d9d9d9",
                        color: "white",
                        borderWidth: "3px",
                        padding: "9px",
                      },
                    ]}
                    onClick={(e) => {
                      e.preventDefault();
                      handelAddToWish();
                    }}
                  >
                    <FavoriteBorderIcon
                      sx={{ width: "22px", height: "22px" }}
                    />
                  </IconButton>
                </div>
                <div className="detailwishletter"> Save for later</div>
              </div>
            </div>
          </div>
        </form>
        <div className="horizontal-line"></div>
      </div>
    </div>
  );
};

export default Detail;
