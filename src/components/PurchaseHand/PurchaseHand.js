import React from "react";
import "./PurchaseHand.css";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PurchaseHandImg from "../../assets/images/puchasehand/purchasehand.png";
const PurchaseHand = () => {
  const navigate = useNavigate();
  const handleMore = () => {
    window.scrollTo(0, 0);
  };

  const handleOrder = () => {
    navigate("/shop");
  };
  return (
    <div className="purchasehand-container container">
      <div>
        <h3>Purchase differently with Proqure</h3>
      </div>
      <div className="justify-content-center d-flex">
        <p className="purchasehand-letter">
          At Proqure, empower millions of Africans with economic advantages as
          we unlock the potentials and gains of the food-vendor value chain in
          Sub-Saharan Africa.
        </p>
      </div>
      <img src={PurchaseHandImg} className="handimgclass" alt="handimg" />
    </div>
  );
};

export default PurchaseHand;
