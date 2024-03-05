import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TabTitle } from "../../utils/General";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./Checkout.css";
import ReactLoading from "react-loading";
import TopSubmenu from "../TopSubmenu/TopSubmenu";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { CartItemsContext } from "../../Context/CartItemsContext";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toastr } from "../../utils/toastr";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import headerImg from "../../assets/images/header.png";

import {
  addDotToNumber,
  isEmpty,
  isNumber,
  setLogOut,
} from "../../utils";
import { getPendingList, setRedirect } from "../../store/slice/categorySlice";
import { getPayment } from "../../store/slice/categorySlice";
import ConfirmDialog from "./ConfirmDialog/ComfirmDialog";
import PendingDialog from "./PendingDialog/PendingDialog";
import { useRef } from "react";

const eiconostyle = {
  width: "50px",
  height: "50px",
  color: "#04AA6D",
};

const style = {
  position: "fixed", // Use fixed position for the modal
  top: "55%", // Set top position to 50%
  left: "50%", // Set left position to 50%
  transform: "translate(-50%, -50%)", // Use translate to center the modal
  minWidth: "450px",
  width: "500px",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #04AA6D",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
};

const Checkout = () => {
  TabTitle("CHECKOUT - PROQURE");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo)
  const redirect = useSelector((state) => state.category.redirect);
  const pendingList = useSelector((state) => state.category.pendingList);

  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalMoney, setTotalMoney] = useState(0);
  const cartItems = useContext(CartItemsContext);
  const selectedOption = window.localStorage.getItem("flatlocal");
  const [paySelectedOption, setPaySelectedOption] = useState("payoption1");
  const [subPaySelectedOption, setSubPaySelectedOption] = useState("subpayoption1");
  const [schedule_date, setScheduleDate] = useState(dayjs());
  const [open, setOpen] = useState(false);
  const [expressDlgFlag, setExpressDlgFlag] = useState(false);
  const [pendingopen, setPendingOpen] = useState(false);
  const [opayInfo, setOpayInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [termCheckBox, setTermCheckBox] = useState(false);

  const flatrate = 1000;
  const localpickup = 0;

  // Express method
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  // Card and Band payment option end
  

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    console.log("=======cartItems:", cartItems.items)
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setFadeIn(true);
        window.scrollTo(0, 0);
      }, 300);
    }, 1500);
    getTotalMoney();
    dispatch(getPendingList({ user_id: userInfo.id }));
  }, [cartItems]);

  const handlePayOptionChange = (event) => {
    console.log("handlePayOptionChange:", event.target.value)
    setPaySelectedOption(event.target.value);
  };
  const handleSubPayOptionChange = (event) => {
    setSubPaySelectedOption(event.target.value);
  };

  const getTotalMoney = () => {
    if (selectedOption === "option1") {
      setTotalMoney(cartItems.totalAmount + flatrate);
    } else {
      setTotalMoney(cartItems.totalAmount + localpickup);
    }
  };

  const handleFlatLocal = (flatlocal) => {
    if (flatlocal === "option1") {
      return "Flat rate";
    } else if (flatlocal === "option2") {
      return "Local pickup";
    }
  };

  const handlePayOption = (payOption) => {
    if (payOption === "payoption1") {
      return "Schedule Delivery";
    } else if (payOption === "payoption2") {
      return "Pay on delivery";
    } else if (payOption === "payoption3") {
      return "Pay with card or transter";
    } else if (payOption === "payoption4") {
      if (subPaySelectedOption === "subpayoption1") {
        return "Buy Now Pay Later in 5 days";
      } else if (subPaySelectedOption === "subpayoption2") {
        return "Buy Now Pay Later in 7 days";
      }
    }
  };
  const handleExpressConfirm = () => {
    console.log("Card_Confirm:", orderName, orderDescription, userName, userEmail, phoneNumber);
    if (isEmpty(userName)) return toastr.warning("User name is required", 0);
    if(isEmpty(userEmail)) return toastr.warning("User email is required", 0)
    if(!isNumber(phoneNumber)) return toastr.warning("Phone number is not a number", 0);
    if (isEmpty(orderName)) return toastr.warning("Order name is required", 0);
    if(isEmpty(orderDescription)) return toastr.warning("Order description is required", 0)
    let data = { userId: userInfo.id, userName, userEmail, userMobile: phoneNumber, orderName, orderDescription };
    setOpayInfo(data);
    toastr.success("Successfully entered", 300);
    setTimeout(() => {
      setExpressDlgFlag(false);
    }, 300);
  };

  const handlePayment = () => {
    if (isEmpty(cartItems.items)) {
      setIsLoading(false);
      return toastr.warning("Please add order items", 0);
    }
    setLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoading(false);
    }, 4500);

    if (isEmpty(userInfo.id)) navigate("/login");

    let flatlocal = window.localStorage.getItem("flatlocal");
    let shipping = handleFlatLocal(flatlocal);
    let option = handlePayOption(paySelectedOption);
    console.log("paySelectedOption:", paySelectedOption, option);
    let formattedTime = '';
    if (paySelectedOption === "payoption1") {
      formattedTime = dayjs(schedule_date).format();
    }
    console.log("schedule_date", formattedTime);

    let params = {
      items: cartItems.items,
      totalAmount: cartItems.totalAmount,
      shipping: shipping,
      user_id: userInfo.id,
      option: option,
    };
    if(!isEmpty(formattedTime)) params.schedule_date = formattedTime;
    if(paySelectedOption === "payoption3"){
      if(!isEmpty(opayInfo)){
        params.opayInfo = opayInfo;
      } 
      else{
        return toastr.warning("Payment information is required", 3000);
      }
    }
    console.log("cartyItems:", params);
    dispatch(getPayment(params));
  };

  useEffect(() => {
    if (redirect) {
      dispatch(setRedirect(false));
      setLogOut();
      navigate("/login");
    }
  }, [redirect]);

  const handleConfirm = () => {
    setOpen(false);
    handlePayment();
  };

  const handleClose = () => {
    setIsLoading(false);
    setOpen(false);
    setExpressDlgFlag(false);
  };

  const handlePendingDialog = () => {
    if (isEmpty(userInfo.id)) navigate("/login");
    dispatch(getPendingList({ user_id: userInfo.id }));
    setTimeout(() => {
      if (isEmpty(pendingList)) {
        return;
      }
      setPendingOpen(true);
    }, 300);
  };

  const handlePendingConfirm = () => {
    setPendingOpen(false);
  };

  const handleProceedPayment = () => {
    console.log("termCondition:", termCheckBox)
    if(!termCheckBox){
      toastr.warning("You must agree terms and conditions", 0)
      return;
    }
    window.scrollTo(0, 0);
    setIsLoading(true);
    setTimeout(() => {
      setOpen(true);
    }, 300);
  }
  return (
    <>
      {loading ? (
        <ReactLoading type="spokes" className="m-auto entire-loading" />
      ) : (
        <>
          <Modal open={expressDlgFlag}>
            <Box sx={style} className="pendingmodalbody">
              <div className="d-flex justify-content-center align-items-center">
                <div className="pendingmodalclose" onClick={handleClose}>
                  <CloseIcon />
                </div>
                <div className="pendingmodalimg">
                  <img src={headerImg} alt="" />
                </div>
              </div>
              <div className="pendingpcontainter">
              <div className="checkout_form_droup">
                  <label className="checkout_top_lable" htmlFor="userName">
                    User Name<span className="checkout_star"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="checkout_form_droup">
                  <label className="checkout_top_lable" htmlFor="userEmail">
                    User Emial<span className="checkout_star"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="checkout_form_droup">
                  <label className="checkout_top_lable" htmlFor="phoneNumber">
                    Phone Number<span className="checkout_star"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="checkout_form_droup">
                  <label className="checkout_top_lable" htmlFor="fullName">
                    Order Name<span className="checkout_star"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="fullName"
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                  />
                </div>
                <div className="checkout_form_droup">
                  <label className="checkout_top_lable" htmlFor="fullName">
                    Order Description<span className="checkout_star"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="fullName"
                    value={orderDescription}
                    onChange={(e) => setOrderDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="pendingpmodalbuttonroot">
                <button
                  className="pendingmodalbutton"
                  onClick={handleExpressConfirm}
                >
                  DONE
                </button>
              </div>
            </Box>
          </Modal>
          <div
            className={`checkoutcontainer container fade-in ${
              fadeIn ? "active" : ""
            }`}
          >
            <TopSubmenu title={"Checkout"} />
            <ConfirmDialog
              header={"Are you sure you want to order?"}
              content={"Please check your order information again."}
              open={open}
              handleConfirm={handleConfirm}
              handleClose={handleClose}
            />
            <PendingDialog
              open={pendingopen}
              handleConfirm={handlePendingConfirm}
              handleClose={handlePendingConfirm}
            />
            <div className="checkoutus_sec" id="partbody">
              <div className="checkout_wrapper">
                <div className="col_left">
                  <div className="heading">
                    <h1>
                      Return Customer?
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogin();
                        }}
                      >
                        Login
                      </a>
                    </h1>
                    <h3>Billing Details</h3>
                  </div>
                  <form className="checkout_form" method="post" action="">
                    <div className="d-flex justify-content-between">
                      <div className="checkout_form_droup mr-2">
                        <label
                          className="checkout_top_lable"
                          htmlFor="fullName"
                        >
                          First Name<span className="checkout_star"> *</span>
                        </label>
                        <input
                          className="input_field"
                          type="text"
                          placeholder=""
                          name="emailAddress"
                        />
                      </div>
                      <div className="checkout_form_droup">
                        <label
                          className="checkout_top_lable"
                          htmlFor="fullName"
                        >
                          Last Name<span className="checkout_star"> *</span>
                        </label>
                        <input
                          className="input_field"
                          type="text"
                          placeholder=""
                          name="phoneNumber"
                        />
                      </div>
                    </div>
                    <div className="checkout_form_droup">
                      <label className="checkout_top_lable" htmlFor="fullName">
                        Phone Number<span className="checkout_star"> *</span>
                      </label>
                      <input type="text" placeholder="" name="fullName" />
                    </div>
                    <div className="checkout_form_droup">
                      <label className="checkout_top_lable" htmlFor="fullName">
                        Email Address<span className="checkout_star"> *</span>
                      </label>
                      <input type="text" placeholder="" name="fullName" />
                    </div>
                    <div className="checkout_form_droup">
                      <label className="checkout_top_lable" htmlFor="fullName">
                        State<span className="checkout_star"> *</span>
                      </label>
                      <input type="text" placeholder="" name="fullName" />
                    </div>
                    <div className="checkout_form_droup">
                      <label className="checkout_top_lable" htmlFor="fullName">
                        City<span className="checkout_star"> *</span>
                      </label>
                      <input type="text" placeholder="" name="fullName" />
                    </div>
                    <div className="checkout_form_droup">
                      <label className="checkout_top_lable" htmlFor="fullName">
                        Street Address<span className="checkout_star"> *</span>
                      </label>
                      <input type="text" placeholder="" name="fullName" />
                    </div>
                    <div className="checkout_form_droup">
                      <FormControlLabel
                        className="checkout-createaccount"
                        control={<Checkbox className="checkboxclass" />}
                        label="Create an account?"
                      />
                    </div>
                  </form>
                </div>
                <div className="col_right">
                  <div className="checkout_options">
                    <div className="check__amount">
                      <div className="text-right">
                        <Badge
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          badgeContent={pendingList && pendingList.length}
                          className="pendingicon"
                        >
                          <PendingActionsIcon
                            sx={{
                              color: "#04aa6d",
                              bgcolor: "#faf6f1",
                              "&:hover": {
                                cursor: "pointer",
                                scale: "1.1",
                                transition: "0.3s all",
                              },
                              textalign: "center",
                              alignself: "center",
                              fontSize: "35px",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePendingDialog();
                            }}
                          />
                        </Badge>
                      </div>
                      <div className="check__amount__label">YOUR ORDER</div>
                      <div className="proceed-checkout-total">
                        <div className="d-flex justify-content-between checkout-total-subheader">
                          <span>PRODUCT</span>
                          <span>SUBTOTAL</span>
                        </div>
                        <div className="checkout-options-horizontal-line"></div>
                        <div>
                          {cartItems.items &&
                            cartItems.items.map((item, index) => (
                              <div
                                className="d-flex justify-content-between"
                                key={index}
                              >
                                <div className="checkout-options-check-product-subtotal">
                                  {item.name}
                                </div>
                                <div className="check__subtotal__product__value">
                                  ₦{addDotToNumber(item.price * item.quantity)}
                                </div>
                              </div>
                            ))}
                          {isEmpty(cartItems.items) ? (
                            <div className="text-center">
                              <RemoveShoppingCartIcon style={eiconostyle} />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="checkout-options-horizontal-line"></div>
                        <div className="d-flex justify-content-between">
                          <div className="checkout-options-check-subtotal">
                            Subtotal
                          </div>
                          <div className="check__subtotal__value">
                            ₦{addDotToNumber(cartItems.totalAmount)}
                          </div>
                        </div>
                        <div className="checkout-options-horizontal-line"></div>
                        <div className="d-flex">
                          <div className="checkout-options-shipping">
                            <span>Shipping</span>
                          </div>
                          <div className="checkout-options-check">
                            <div className="d-flex">
                              <div className="checkout-options-flat checkout-options-general">
                                Flat rate:{" "}
                                <span>₦{addDotToNumber(flatrate)}</span>
                              </div>
                              <input
                                type="radio"
                                value="option1"
                                checked={selectedOption === "option1"}
                                className="checkout-options-radio ordershipradio"
                                onChange={(e) => {}}
                              />
                            </div>
                            <div className="d-flex">
                              <div className="checkout-options-local checkout-options-general">
                                Local pickup:{" "}
                                <span>₦{addDotToNumber(localpickup)}</span>
                              </div>
                              <input
                                type="radio"
                                value="option2"
                                checked={selectedOption === "option2"}
                                className="checkout-options-radio ordershipradio"
                                onChange={(e) => {}}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="checkout-options-horizontal-line"></div>
                        <div className="d-flex justify-content-between">
                          <div className="checkout-options-check-amout">
                            Total
                          </div>
                          <div className="check__amount__value">
                            ₦{addDotToNumber(totalMoney)}
                          </div>
                        </div>
                      </div>
                      <div className="orderoptionsselect">
                        <div className="d-flex">
                          <input
                            type="radio"
                            value="payoption1"
                            checked={paySelectedOption === "payoption1"}
                            className="checkout-options-radio ordershipradio"
                            onChange={handlePayOptionChange}
                          />
                          <div className="ml-2 checkout-options-ratio-text">
                            Schedule Delivery
                          </div>
                        </div>
                        {paySelectedOption === "payoption1" ? (
                          <div className="paymentdatepicker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                viewRenderers={{
                                  hours: renderTimeViewClock,
                                  minutes: renderTimeViewClock,
                                  seconds: renderTimeViewClock,
                                }}
                                value={schedule_date}
                                onChange={(newValue) =>
                                  setScheduleDate(newValue)
                                }
                              />
                            </LocalizationProvider>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="checkout-options-horizontal-line"></div>
                      <div className="orderoptionsselect">
                        <div className="d-flex">
                          <input
                            type="radio"
                            value="payoption2"
                            checked={paySelectedOption === "payoption2"}
                            className="checkout-options-radio ordershipradio"
                            onChange={handlePayOptionChange}
                          />
                          <div className="ml-2 checkout-options-ratio-text">
                            Pay on delivery
                          </div>
                        </div>
                        <div className="d-flex">
                          <input
                            type="radio"
                            value="payoption3"
                            checked={paySelectedOption === "payoption3"}
                            className="checkout-options-radio ordershipradio"
                            onChange={ e => {handlePayOptionChange(e); setExpressDlgFlag(true)}}
                          />
                          <div className="ml-2 checkout-options-ratio-text">
                            Pay with card or transter
                          </div>
                        </div>
                        <div className="d-flex">
                          <input
                            type="radio"
                            value="payoption4"
                            checked={paySelectedOption === "payoption4"}
                            className="checkout-options-radio ordershipradio"
                            onChange={handlePayOptionChange}
                          />
                          <div className="ml-2 checkout-options-ratio-text">
                            Buy Now Pay Later
                          </div>
                        </div>
                      </div>
                      {paySelectedOption === "payoption4" ? (
                        <div className="subpayoptionclass">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <input
                                type="radio"
                                value="subpayoption1"
                                checked={
                                  subPaySelectedOption === "subpayoption1"
                                }
                                className="checkout-options-radio ordershipradio"
                                onChange={handleSubPayOptionChange}
                              />
                              <div className="ml-2 checkout-options-ratio-text">
                                Buy Now Pay Later in 5 days
                              </div>
                            </div>
                            <div className="check__amount__value">
                              ₦{addDotToNumber(totalMoney)}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <input
                                type="radio"
                                value="subpayoption2"
                                checked={
                                  subPaySelectedOption === "subpayoption2"
                                }
                                className="checkout-options-radio ordershipradio"
                                onChange={handleSubPayOptionChange}
                              />
                              <div className="ml-2 checkout-options-ratio-text">
                                Buy Now Pay Later in 7 days
                              </div>
                            </div>
                            <div className="check__amount__value">
                              ₦{addDotToNumber(totalMoney)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="checkout_form_droup">
                      <FormControlLabel
                        className="checkout-pay-label"
                        control={<Checkbox className="checkboxclass" />}
                        label="I have read and agreed to this"
                        onClick={(e) => {
                          setTermCheckBox(!termCheckBox);
                        }}
                      />
                        <span className="checkout-web-condition">
                          website's terms and conditions
                          <span className="checkout_star">*</span>
                        </span>
                      </div>
                    </div>
                    <div className="checkout">
                      <LoadingButton
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
                          borderRadius: "50px",
                          width: "100%",
                          marginTop: "2rem",
                        }}
                        onClick={(e) => {
                          handleProceedPayment()
                        }}
                      >
                        <span className="ml-1">PROCEED TO PAYMENT</span>
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Checkout;
