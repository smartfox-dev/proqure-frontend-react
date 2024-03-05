import React, { useRef, useState } from 'react';
import './MultiCareousel.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { serverURL } from '../../config';
import MultiItemCard from '../../components/Card/MultiItemCard/MultiItemCard';
const MultiCareousel = (props) => {
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

  const moveCarousel = (direction) => {
    if (carouselRef && carouselRef.current) {
      if (direction === 'prev') {
        carouselRef.current.previous();
      } else if (direction === 'next') {
        carouselRef.current.next();
      }
    }
  };

  const handleDotClick = (index) => {
    setActiveItemIndex(index);
    carouselRef.current.goToSlide(index);
  };


  return (
    <div className='container'>
      <Carousel ref={carouselRef} responsive={responsive} className="multi-carousel-container">
        {props.items.slice(0, 6).map((item, index) => (
          <div key={index} className='multiitem-careousel-parent'>
            <MultiItemCard key={index} item={item} category="featured" />
          </div>
        ))}
      </Carousel>
      <div className="carousel-navigation">
        <div className="carousel-dots">
          {props.items.slice(0, 3).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                activeItemIndex === index ? 'active' : ''
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiCareousel;