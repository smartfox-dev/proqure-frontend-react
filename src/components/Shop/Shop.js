import { useEffect, useState } from "react";
import { TabTitle } from "../../utils/General";
import { useDispatch, useSelector } from "react-redux";
import ShopCategory from "./Container/ShopCategory";
import "./Shop.css";
import { isEmpty, setLogOut } from "../../utils";
import SideBar from "./SideBar";
import TopSubmenu from "../TopSubmenu/TopSubmenu";
import { FadeInSection } from "../FadeInSection/FadeInSection";
import ReactLoading from 'react-loading';
import Footer from "../Footer/Footer";
import { Pagination } from "@mui/material";
import { setItemList, setRedirect } from "../../store/slice/categorySlice";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  TabTitle("SHOP - PROQURE");
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading ] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo)
  const shopItemList = useSelector((state) => state.category.shopItemList);
  const redirect = useSelector((state) => state.category.redirect);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(9);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const pageCount = Math.ceil(shopItemList.length / cardsPerPage);
  const currentCards = shopItemList.slice(indexOfFirstCard, indexOfLastCard);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [shopItemList])
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
          setFadeIn(true);
          window.scrollTo(0, 0);    
      }, 500);
    }, 1500);
    let params = {
      user_id: userInfo.id,
      user_email: userInfo.email,
    };
    dispatch(setItemList(params));
  }, []);

  useEffect(() => {
    if (redirect) {
      dispatch(setRedirect(false));
      setLogOut();
      navigate("/login");
    }
  }, [redirect]);

  return (
    <>
      {loading ? (
        <ReactLoading type="spokes" className="m-auto entire-loading" />
      ) : (
        <>
          <div className={`container fade-in ${fadeIn ? "active" : ""}`}>
            <TopSubmenu title={"Explore"} />
            <div className="d-flex shopcontainer">
              <div className="shoptreeview">
                <SideBar />
              </div>
              <FadeInSection>
                <div
                  className={`shop__contianer container fade-in ${
                    fadeIn ? "active" : ""
                  }`}
                  id="partbody"
                >
                  {currentCards && (
                    <ShopCategory
                      name="Proqure"
                      key="proqure"
                      items={currentCards}
                    />
                  )}
                </div>
              </FadeInSection>
            </div>
            <div className="paginationrange">
              <Pagination
                className="custompagination"
                count={pageCount}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                size="large"
                onChange={handleChange}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Shop;
