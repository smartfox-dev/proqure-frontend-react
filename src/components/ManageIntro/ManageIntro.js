import React from "react";
import "./ManageIntro.css";
import { useNavigate } from "react-router-dom";
import calculateImg from "../../assets/images/manageintro/total1.png";
import busImg from "../../assets/images/manageintro/total2.png";
import reportImg from "../../assets/images/manageintro/total3.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Example = () => {
  const navigate = useNavigate();
  const handleMore = () => {
    window.scrollTo(0, 0);
  };

  const handleOrder = () => {
    navigate("/shop");
  };
  return (
    <div className="manageintro-container container">
      <div className="manageintro_header container">
        <h1 className="manageintro__header__big">
          We are your
          <span className="text-success-main managefood">
            {" "}
            one-shop business
          </span>{" "}
          needs
        </h1>
        <div className="manageintro__sub__header">
          Proqure Enables Businesses To Grow Exponentially By Easing Access To
          Major Growth-drivers.
        </div>
      </div>
      <section className="mx-auto">
        <div className="managecontainer">
          <div className="managecol row12">
            <img src={calculateImg} alt="integratedpay"></img>
            <div className="mb-3">
              <h2 style={{ marginTop: "30px" }}>Best-In-Class Supply Chains</h2>
              <div>
                <span>
                  Comprehensive categories of raw materials, Simple & fast
                  order/ fulfilment/ payment processes
                </span>
              </div>
            </div>
            <ArrowForwardIcon className="manageintro-arrow" />
          </div>
          <div className="managecol row21">
            <img src={busImg} alt="productcatalogue"></img>
            <div className="mb-3">
              <h2 style={{ marginTop: "30px" }}>
                Accessible Financial Products
              </h2>
              <span>
                Buy-Now-Pay-Later to support growth opportunities, Growth
                financing for business owners
              </span>
            </div>
            <ArrowForwardIcon className="manageintro-arrow" />
          </div>
          <div className="managecol row22">
            <img src={reportImg} alt="reportanaytics"></img>
            <div className="mb-3">
              <h2 style={{ marginTop: "30px" }}>Growth Tools & Support</h2>
              <span>
                Insights and Reports for your business, Financial Advisory
                Services, Business Management Solutions
              </span>
            </div>
            <ArrowForwardIcon className="manageintro-arrow" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Example;
