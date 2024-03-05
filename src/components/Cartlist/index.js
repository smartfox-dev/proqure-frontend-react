import { useContext, useEffect, useState } from "react";
import { CartItemsContext } from "../../Context/CartItemsContext";
import "./index.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCard from "../Card/CartCard/CartCard";
import { Fragment } from "react";
import TopSubmenu from "../TopSubmenu/TopSubmenu";
import FeaturedItems from "../Featured/Items/FetauredItems";
import ReactLoading from 'react-loading';
import { TabTitle } from "../../utils/General";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../Footer/Footer";
import { toastr } from "../../utils/toastr";
import { isEmpty, addDotToNumber } from "../../utils";
import { setRedirect } from "../../store/slice/categorySlice";
import { serverURL } from "../../config";

const Cartlist = () => {
  TabTitle("CART - PROQURE");
  let flatrate = 1000;
  let localpickup = 0;
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.userInfo)
  const redirect = useSelector((state) => state.auth.redirect);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [couponValue, setCouponValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setUpdateIsLoading] = useState(false);
  const [cisLoading, setCisLoading] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [discountData, setDiscountData] = useState('');
  const [selectedOption, setSelectedOption] = useState("option1");
  const [couponStep, setCouponStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const cartItems = useContext(CartItemsContext);
  const cartItemList = useSelector((state) => state.category.cartList);
  const cartItemsContext = useContext(CartItemsContext);
    

  const calculateTotalAmount = (currentCartItems) => {
    let total = 0;
    currentCartItems.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    return total;
  };

  const handleOptionChange = (event) => {
    window.localStorage.setItem("flatlocal", event.target.value);
    setSelectedOption(event.target.value);
    console.log("eventtarget: ", event.target.value);
    getTotalMoney(event.target.value);
  };
  const getTotalMoney = (mOption = "option1") => {
    console.log("getTotalMoney", cartItems);
    if (mOption === "option1") {
      setTotalMoney(cartItems.totalAmount + flatrate);
    } else {
      setTotalMoney(cartItems.totalAmount + localpickup);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setFadeIn(true);
        window.scrollTo(0, 0);
      }, 500);
    }, 1500);
    getTotalMoney(selectedOption);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const handleCouponValue = async () => {
    console.log("prectitems:", cartItems);
    setTimeout(() => {
      setIsLoading(false);
      setCouponStep(2);
    }, 1300);

    if (isEmpty(couponValue)) {
      toastr.warning("Coupon code is empty");
      return;
    }
    const res = await axios.post(serverURL + "/api/coupon/item", { user_id:userInfo.id, couponValue });
    const data = res.data;
    console.log("data:", data)
    if (data.status === 1) {
      toastr.warning(data.message);
      return;
    }
    if (data.result.count <= 0) {
      toastr.warning("The coupon code has already been used");
      return;
    }
    const hres = await axios.post(serverURL + "/api/coupon/useditem", { user_id: userInfo.id, couponValue, count: data.result.count - 1});
    console.log("couponHistory:", hres);
    if (hres.data.status === 0) {
      setDiscountData(data);
      toastr.success("Successfully is applied");
    }
  };
  
  const handleUpdateCart = () => {
    setTimeout(() => {
      setUpdateIsLoading(false);
    }, 1300);
    if(couponStep !== 2){
      toastr.warning("Coupon is not applied");
      return;
    }
    if(!isEmpty(discountData)){
      if (discountData.result.type === "Discount(%)") {
        setTimeout(() => {
          cartItems.totalAmount -=
            cartItems.totalAmount * (Number(discountData.result.value) / 100);
        }, 1000);
      } else if (discountData.result.type === "Cash Off Order") {
        setTimeout(() => {
          cartItems.totalAmount =
            cartItems.totalAmount - Number(discountData.result.value);
        }, 1000);
      } else if (discountData.result.type === "Category Specific") {
        let applied_id = discountData.result.applied_id;
        console.log("category_cartItems:", cartItems);
        let tempItems = cartItems.items;
        const updatedItems = tempItems.map((item) => {
          if (Number(item.cat_id) === Number(applied_id)) {
            return { ...item, price: item.price - discountData.result.value };
          }
          return item;
        });
        cartItems.totalAmount = calculateTotalAmount(updatedItems);
        cartItems.addFullItem(updatedItems);
      } else if (discountData.result.type === "Free Delivery") {
        setTimeout(() => {
          flatrate = 0;
        }, 1000);
      } else if (discountData.result.type === "BOGOF"){
        let applied_id = discountData.result.applied_id;
        let tempItems = cartItems.items;
        const updatedItems = tempItems.map((item) => {
          if (Number(item.product_id) === Number(applied_id)) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        cartItems.addBogofFlag(true);
        setTimeout(() => {
          cartItems.addFullItem(updatedItems);
        }, 1500);
      }
      toastr.success("Successfully updated");
      setCouponStep(1);
      setTimeout(() => {
        getTotalMoney(selectedOption);
      }, 1500); 
    }
  }
  const handleCheckout = async () => {
    setTimeout(() => {
      setCisLoading(false);
      navigate("/checkout");
    }, 1000);
  };

  useEffect(() => {
    if (redirect) {
      dispatch(setRedirect(false));
      navigate("/login");
    }
  }, [redirect]);

  useEffect(() => {
    if (isAuthenticated) {
      cartItemsContext.addFullItem(cartItemList);
      setTimeout(() => {
        cartItems.totalAmount = calculateTotalAmount(cartItemList);
        getTotalMoney(selectedOption);
      }, 500);
    } else {
      cartItemsContext.addFullItem([]);
    }
  }, [cartItemList]);
  return (
    <>
      {loading ? (
        <ReactLoading type="spokes" className="m-auto entire-loading" />
      ) : (
        <>
          <div className={`container fade-in ${fadeIn ? "active" : ""}`}>
            <TopSubmenu title={"Cart"} />
            <div className={`cartlist fade-in ${fadeIn ? "active" : ""}`}>
              <div className="cartlist__container">
                <div className="cart__items__container">
                  <div className="cartItems">
                    <div className="shop__cart__items">
                      <div className="cart__item__header">
                        <div className="cart__item__header-cell cart__header__cell__product">
                          PRODUCT
                        </div>
                        <div className="cart__item__header-cell">SIZE</div>
                        <div className="cart__item__header-cell">PRICE</div>
                        <div className="cart__item__header-cell">QUANTITY</div>
                        <div className="cart__item__header-cell">SUBTOTAL</div>
                      </div>
                      {cartItems.items.map((item, index) => (
                        <CartCard key={item.id} item={item} />
                      ))}
                      <div className="cartpagebutton">
                        <div className="cart_total_cupon">
                          <input
                            type="text"
                            placeholder="Coupon code"
                            name="companyName"
                            value={couponValue}
                            onChange={(e) => {
                              setCouponValue(e.target.value);
                            }}
                          />
                          <LoadingButton
                            className="cartappoycoupon"
                            loading={isLoading}
                            startIcon={
                              isLoading && (
                                <CircularProgress size={20} color="inherit" />
                              )
                            }
                            sx={{
                              color: "#fff",
                              bgcolor: "#04AA6D",
                              "&:hover": {
                                bgcolor: "#0ebb7c",
                              },
                              textalign: "center",
                              alignself: "center",
                              fontSize: "15px",
                              padding: "7px 20px",
                              marginLeft: "0.7rem",
                              borderRadius: "50px",
                              height: '40px',
                              width: "200px",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsLoading(true);
                              handleCouponValue();
                            }}
                          >
                            <span className="ml-1"> APPLY COUPON</span>
                          </LoadingButton>
                        </div>
                        <LoadingButton
                          className="cartupdatebutton"
                          loading={isUpdateLoading}
                          startIcon={
                            isUpdateLoading && (
                              <CircularProgress size={20} color="inherit" />
                            )
                          }
                          sx={{
                            color: "#837979",
                            bgcolor: "#e5e4e4",
                            "&:hover": {
                              bgcolor: "#d1d1d1",
                            },
                            textalign: "center",
                            alignself: "center",
                            fontSize: "15px",
                            padding: "7px 10px",
                            borderRadius: "50px",
                            fontFamily: "Inter",
                            width: "170px",
                            height: "40px",
                            marginTop: "36px",
                            marginRight: "35px",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            setUpdateIsLoading(true);
                            handleUpdateCart();
                          }}
                        >
                          <span className="ml-1">UPDATE CART</span>
                        </LoadingButton>
                      </div>
                    </div>
                    <div className="options">
                      <div className="total__amount">
                        <div className="total__amount__label">CART TOTALS</div>
                        <div className="cart-options-horizontal-line"></div>
                        <div className="d-flex">
                          <div className="cart-options-shipping">
                            <span>Shipping</span>
                          </div>
                          <div className="cart-options-total">
                            <div className="d-flex">
                              <div className="cart-options-flat cart-options-general">
                                Flat rate: <span>₦{addDotToNumber(1000)}</span>
                              </div>
                              <input
                                type="radio"
                                value="option1"
                                checked={selectedOption === "option1"}
                                onChange={handleOptionChange}
                                className="cart-options-radio"
                              />
                            </div>
                            <div className="d-flex">
                              <div className="cart-options-local cart-options-general">
                                Local pickup: <span>₦{addDotToNumber(0)}</span>
                              </div>
                              <input
                                type="radio"
                                value="option2"
                                checked={selectedOption === "option2"}
                                onChange={handleOptionChange}
                                className="cart-options-radio"
                              />
                            </div>
                            <div className="cart-options-shippingto cart-options-general">
                              Shipping to <span>LAGOS</span>
                            </div>
                            <div
                              className="cart-options-change cart-options-general"
                              onClick={(e) => {
                                e.preventDefault();
                                handleModalOpen(true);
                              }}
                            >
                              Change address
                            </div>
                          </div>
                        </div>
                        <div className="cart-options-horizontal-line"></div>
                        <div className="d-flex justify-content-between">
                          <div className="cart-options-total-amout">Total</div>
                          <div className="total__amount__value">
                            <div className="proccedright">
                              <span>₦{addDotToNumber(totalMoney)}</span>
                              {/* <span className="procceditemsprice">₦{addDotToNumber(cartItems.totalAmount)}</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="checkout">
                        <LoadingButton
                          loading={cisLoading}
                          startIcon={
                            cisLoading && (
                              <CircularProgress size={20} color="inherit" />
                            )
                          }
                          sx={{
                            color: "#fff",
                            bgcolor: "#04AA6D",
                            "&:hover": {
                              bgcolor: "#0ebb7c",
                            },
                            textalign: "center",
                            alignself: "center",
                            fontSize: "15px",
                            padding: "7px 20px",
                            borderRadius: "50px",
                            width: "100%",
                            // height: '40px',
                            marginTop: "3rem",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            setCisLoading(true);
                            handleCheckout();
                          }}
                        >
                          <span className="ml-1">PROCEED TO CHECKOUT</span>
                        </LoadingButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FeaturedItems />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Cartlist;
