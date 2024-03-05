import { useState, useEffect } from 'react';
import './Landing.css'
import { Link } from "react-router-dom"
import { Button } from "@mui/material";
import ItemCareousel from '../Item/Carousel/ItemCarousel';
import Pending from '../../components/Pending/Pending';
const Landing = () => {
    return (
        <div>
            <div className="landing__container faded faded-bottom">
                <div className="landing__header__container">
                    <div className="landing__header ">
                        <h3 className="landing__header__discount lineUp">UP TO 15% DISCOUNT</h3>
                        <h1 className="landing__header__main lineUp">Checkout The Best Fashion Style</h1>
                       
                        <Link to="/shop" style={{ zIndex: '100' }}>
                            <button className='btn-simple2'>SHOP NOW</button>
                        </Link>
                    </div>
                </div>
                <div className="landing__image__container">
                    <ItemCareousel/>
                </div>
            </div>
        </div>
    );
}

export default Landing;