import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./ItemCarousel.css";
import { ItemCareouselEffect } from "./ItemCarouselEffect";
import { serverURL } from "../../../config";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const ItemCarouselDetail = (props) => {
  console.log("ritemList:", props.ritemList);
  let ritemList = props.ritemList;
  if(ritemList.length > 3){
    ritemList = ritemList.slice(0, 3);
  }
  const carouselRef = useRef(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 760, min: 0 },
      items: 1,
    },
  };
 
  useEffect(() => {
    ItemCareouselEffect();
  }, []);

  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        <div className="careousel-img-container">
          <div className="main-image">
            <img
              src={serverURL + props.item.image}
              alt="MainImage"
              id="mainImage"
            />
          </div>
          <div className="carousel">
            {ritemList &&
              ritemList.map((item, index) => (
                <div key={index}>
                  <img
                    className="small-image"
                    src={serverURL + item.image}
                    alt="SmallImage1"
                    data-image={serverURL + item.image}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCarouselDetail;
