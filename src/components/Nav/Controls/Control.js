import "./Control.css";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { CartSVG, HardSVG, TopBellSVG, UserSVG } from "../../Electron/SVG";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemList } from "../../../store/slice/categorySlice";
import { useState } from "react";
import NotificationCard from "../../Card/Notificationlist/NotificationCard";
import WishCard from "../../Card/Wishlist/WishCard";
import NotificationImg from "../../../assets/images/message/notification.png";
const Control = () => {
  const dispatch = useDispatch();

  const wishItems = useContext(WishItemsContext);
  const cartItems = useContext(CartItemsContext);
  const [messageItems, setMessageItems] = useState([]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.userInfo)
  const wishItemList = useSelector((state) => state.category.wishList);
  const cartItemList = useSelector((state) => state.category.cartList);
  const messageItemList = useSelector((state) => state.category.messageList);

  const wishItemsContext = useContext(WishItemsContext);
  const cartItemsContext = useContext(CartItemsContext);

  //notificationitems

  useEffect(() => {
    let params = {
      user_id: userInfo.id,
      user_email: userInfo.email,
    };
    dispatch(setItemList(params));
  }, [dispatch, userInfo.id, userInfo.email]);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      wishItemsContext.addFullItem(wishItemList);
      cartItemsContext.addFullItem(cartItemList);
      setMessageItems(messageItemList);
    } else {
      wishItemsContext.addFullItem([]);
      cartItemsContext.addFullItem([]);
      setMessageItems([]);
    }
  }, [wishItemList, cartItemList, isAuthenticated, messageItemList]);

  return (
    <div className="control__bar__container">
      <div className="controls__container">
        <div className="headerdropdown" id="ndropdown-btn">
          <div className="control">
            <Badge
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={messageItems.length}
              className="headerdropdown-button topbellbadge"
            >
              <TopBellSVG color="black" />
            </Badge>
            <div
              className={`headerdropdown-content ${
                messageItems.length === 0 ? "dropdown-hidden" : ""
              }`}
              id="ndropdown-menu"
            >
              <div className="subdropdownheader">
                <div className="notification__message__icon">
                  <img src={NotificationImg} alt="message" />
                </div>
                <span className="subdropspan">◜ ⟣𓂃 Notification ‧ ✧ ◞</span>
              </div>
              <div className="headerdropdown-content-scroll">
                {messageItems.length > 0
                  ? messageItems.map((item, index) => (
                      <NotificationCard key={item.id} item={item} />
                    ))
                  : ""}
              </div>
              <div className="subdropdownbottom"></div>
            </div>
          </div>
        </div>

        <div className="wishdropdown" id="wdropdown-btn">
          <div className="control">
            <Badge
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={wishItems.items.length}
              color="error"
            >
              <HardSVG color="black" sx={{ width: "41px", fill: "white" }} />
            </Badge>
            <div
              className={`wishdropdown-content ${
                wishItems.items.length === 0 ? "dropdown-hidden" : ""
              }`}
            >
              <div className="subdropdownheader">
                <div className="notification__message__icon">💖</div>
                <span className="subdropspan">╭♡ Wishs 〃ˎˊ˗</span>
              </div>
              <div className="wishdropdown-content-scroll">
                {wishItems.items.length > 0
                  ? wishItems.items.map((item, index) => (
                      <WishCard key={item.id} item={item} />
                    ))
                  : ""}
              </div>
              <div className="subdropdownbottom"></div>
            </div>
          </div>
        </div>

        <Link to="/login">
          <div className="user-control">
            <UserSVG color="black" />
          </div>
        </Link>

        <Link to="/cartlist" id="cdropdown-btn">
          <div className="control" style={{ marginLeft: "10px" }}>
            <Badge
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={cartItems.items.length}
            >
              <CartSVG
                style={{ fontSize: "33px" }}
                color="black"
                sx={{ width: "35px" }}
              />
            </Badge>
          </div>
          {/* <span className="controlbar-money">
            ₦ {cartItems.totalAmount.toFixed(2)}
          </span> */}
        </Link>
      </div>
    </div>
  );
};

export default Control;
