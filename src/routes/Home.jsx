import React, { Fragment, useEffect, useState } from "react";
import { TabTitle } from "../utils/General";
import { FadeInSection } from "../components/FadeInSection/FadeInSection";

import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import Total from "../components/Total/Total";
import VerticalMarquee from "../components/VirticalMarquee/VerticalMarquee";
import ManageIntro from "../components/ManageIntro/ManageIntro";
import PurchaseHand from "../components/PurchaseHand/PurchaseHand";
import ReactLoading from "react-loading";
import Footer from "../components/Footer/Footer";
import { setRedirect } from "../store/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLogOut } from "../utils";
import axios from "axios";

const Home = () => {
  TabTitle("Home - PROQURE");  
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const redirect = useSelector((state) => state.category.redirect);
  let httpPath = window.location.href;
  console.log("windowlocation:", httpPath);
  const navigate = useNavigate();
  const [priceData, setPriceData] = useState(null);
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,JPY,EUR&28475892d249fbdf4a8264d9f16b8e3e1377cc2b9056a78165576b08add3ae3c');
        const data = response.data;
        setPriceData(data);
        console.log("===priceData:", data)
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchCryptoData();
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (httpPath.includes("http://proqureng.com")) {
      window.location.href = "https://proqureng.com";
    }
    if (httpPath.includes("http://www.proqureng.com")) {
      window.location.href = "https://www.proqureng.com";
    }
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setFadeIn(true);
        window.scrollTo(0, 0);
      }, 500);
    }, 1500);
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
        <div className={`fade-in ${fadeIn ? "active" : ""}`} id="partbody">
          <Fragment>
            <Total />
            <VerticalMarquee />
            <FeaturedItems />
            <FadeInSection>
              <ManageIntro />
            </FadeInSection>
            <FadeInSection>
              <PurchaseHand />
            </FadeInSection>
            <FadeInSection>
              <FeaturedCategories />
            </FadeInSection>
            <Footer />
          </Fragment>
        </div>
      )}
    </>
  );
};

export default Home;
