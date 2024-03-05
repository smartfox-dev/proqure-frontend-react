import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Pending.css'
import slider1 from '../../assets/images/home/1.png';
import slider2 from '../../assets/images/home/2.png';
import slider3 from '../../assets/images/home/3.png';
import slider4 from '../../assets/images/home/4.png';
import slider5 from '../../assets/images/home/5.png';
const Pending = () => {
    const slideImages = [slider1, slider2, slider3];
    // const slideImages = [temp];
    const slideProperties = {
        duration: 3000,
        transitionDuration: 1000,
        infinite: true,
        // indicators: true,
        // arrows: true,
        autoplay: true, // Set autoplay to true
        interval: 3000, // Set the interval between slides to 5000ms (5 seconds)
    };
    return (
        <div className="slide-container">
            <Slide {...slideProperties}>
                {slideImages.map((each, index) => (
                    <div key={index} className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${each})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
            <div className="pending-wrapper_header pendinglettercontainer">
                <h1 className='pending__header__big'>
                    Proqurement Platform for Foood Bussiness in<span className='text-success'> Africa</span>
                </h1>
            </div>
        </div>
    );
};

export default Pending;