import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import socket from "../utils/socket";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../routes/Home";
import Header from "../components/Header/Header";
import ManageAccount from "../components/Account/ManageAccount/ManageAccount";
import MyAccount from "../components/Account/MyAccount/MyAccount";
import Shop from "../components/Shop/Shop";
import ItemView from "../routes/ItemView";
import CategoryView from "../routes/CategoryView";
import SearchView from "../routes/Search";
import CartItemsProvider from "../Context/CartItemsProvider";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import Wishlist from "../components/Wishlist";
import Cartlist from "../components/Cartlist";
import Notificationlist from "../components/Notificationlist";
import WishItemsProvider from "../Context/WishItemsProvider";
import SearchProvider from "../Context/SearchProvider";
// import BackTop from "../components/BackTop/BackTop";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import ChatBot from "../components/ChatBot/ChatBot";
import Checkout from "../components/Checkout/Checkout";
import CreateToastr from "../utils/toastr";

socket.connect();
window.localStorage.setItem("flatlocal", "option1");
function App() {
  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <SearchProvider>
          <Provider store={store}>
            <Router>
              <Header />
              <Routes>
                <Route index path="/" element={<Home />} />
                {/* <Route path=""> */}
                <Route path="me" element={<MyAccount />} />
                <Route path="manage" element={<ManageAccount />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Login />} />
                {/* </Route> */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/category">
                  <Route path=":id" element={<CategoryView />} />
                </Route>
                <Route path="/item/">
                  <Route path=":id" element={<ItemView />} />
                </Route>
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cartlist" element={<Cartlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/notificationlist"
                  element={<Notificationlist />}
                />
                <Route path="/search/*" element={<SearchView />} />
              </Routes>
              <ChatBot />
              <CreateToastr />
            </Router>
          </Provider>
        </SearchProvider>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;
