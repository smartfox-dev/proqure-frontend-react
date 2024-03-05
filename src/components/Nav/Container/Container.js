import DrawerNav from "../DrawerNav/DrawerNav";
import NavBrand from "../Nav-Brand/Navbrand";
import { Link, useLocation, useNavigate } from "react-router-dom";
import headersayImg from "../../../assets/images/headersay.png";
import "./Container.css";

const Navtop = () => {
  const location = useLocation();
  console.log("=====param:", location);
  return (
    <div className="nav__top__container">
      <div className="top__container">
        <NavBrand />
        <div className="bottom__container">
          <ul className="nav">
            <li className="nav-link">
              <Link
                to="/"
                className={location.pathname === "/" ? "headeractive" : ""}
              >
                Home
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/about"
                className={location.pathname === "/about" ? "headeractive" : ""}
              >
                About Us
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/shop"
                className={location.pathname === "/shop" ? "headeractive" : ""}
              >
                Shop
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/contact"
                className={
                  location.pathname === "/contact" ? "headeractive" : ""
                }
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="control__bar d-flex">
          <div>
            <img src={headersayImg} alt="" className="headersay" />
          </div>
          <div className="d-inline-grid headersaytext">
            <span>PROQURE RETAIL NETWORK LTD</span>
            <span>Contact Us (+2348061660945)</span>
            <span>Email: info@proqureng.com</span>
          </div>
        </div>
        <div className="drawer">
          <DrawerNav />
        </div>
      </div>
    </div>
  );
};

export default Navtop;
