import { useState, useEffect } from "react";
import maintopImg1 from "../../assets/images/maintop/maintop1.png";
import maintopImg2 from "../../assets/images/maintop/maintop2.png";
import maintopImg3 from "../../assets/images/maintop/maintop3.png";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import "./Total.css";
const Total = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setIsLoading(false);
      navigate("/shop");
    }, 2000);
  };

  const handleOrder = () => {
    navigate("/cartlist");
  };
  return (
    <div>
      <div className="total__container container">
        <div className="subtop__container">
          <div className="sub-first-main-text">
            FOOD <span>SUPPLY </span> SOLUTIONS
          </div>
          <div className="sub-first-main-text">
            FOR AFRICAN FOOD <span>VENDORS</span>
          </div>
          <div className="sub-second-main-text">
            Our platform helps you stabilize and grow your bakery and food
            vending business by providing to the best supply chains, financial
            services, and business tools.
          </div>
        </div>
        <div className="subtop__third_container">
          <LoadingButton
            loading={isLoading}
            startIcon={
              isLoading && <CircularProgress size={20} color="inherit" />
            }
            sx={{
              color: "#fff",
              bgcolor: "#04AA6D",
              "&:hover": {
                bgcolor: "#0ebb7c",
              },
              width: "170px",
              height: "40px",
              maxWidth: "185px",
              textTransform: "none",
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsLoading(true);
              handleClick();
            }}
          >
            <span className="ml-1" style={{ fontSize: "18px" }}>
              Start Shopping
            </span>
          </LoadingButton>

          <div className="subtopplaytext">
            <PlayCircleFilledIcon
              style={{
                fontSize: "2rem",
                color: "#04aa6d",
                border: "1px solid #b3bec9",
                borderRadius: "100px",
              }}
              onClick={(e) => {
                e.preventDefault();
                handleOrder();
              }}
            />
            <span className="subtop-orderprocess">Order Process</span>
          </div>
        </div>
        <div className="subtopimg">
          <img
            src={maintopImg1}
            alt="maintop1"
            className="subtopimg1 subtopimg-common"
          />
          <img
            src={maintopImg2}
            alt="maintop2"
            className="subtopimg2 subtopimg-common"
          />
          <img
            src={maintopImg3}
            alt="maintop3"
            className="subtopimg3 subtopimg-common"
          />
        </div>
      </div>
    </div>
  );
};

export default Total;
