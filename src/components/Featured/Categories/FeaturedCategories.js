import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './FeaturedCategories.css'
import { addCartItem } from "../../../store/slice/categorySlice";
import { serverURL } from "../../../config";
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { setDealOfTime } from "./DealoOfTime";

const FeaturedCategories = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userInfo = useSelector((state) => state.auth.userInfo)
    const itemList = useSelector((state) => state.category.itemList);
    const handleAddToCart = (item) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        let params = { user_id: userInfo.id, product_id: item.id, quantity: 1, delay: 0 };
        console.log("params", params)
        dispatch(addCartItem(params));
        // cartItemsContext.addItem(props.item, 1);
    }
    
    const handleDetails = (id) => {
        let strUrl = "/item/" + id;
        navigate(strUrl);
    };

    useEffect(() => {
        setDealOfTime();
    },[]);
    
    return (
        <div className="featured__categories__container container">
            <div className="featured__categories">
                {itemList && 
                    <div className="featured__categories__card__container">
                        <div className="firstcategory__card__card">
                            <span className="dealoftheday">Deal of the day</span>
                            <div className="dealoff"><span className="dealofftext">30%OFF</span></div>
                            <div className="firstcategory__image hover__img">
                                <button
                                    className="center-button featured___button00"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    handleDetails(itemList[0]?.id);
                                    }}
                                >
                                    Details
                                </button>
                                <img src={serverURL + itemList[0]?.image} alt="" className="product__img" />
                            </div>
                            <div className="firstcategory__card__detail">
                                <div className="firstcategory__name">
                                    <span>{itemList[0]?.name}</span>
                                </div>
                                <div className="firstcategory__price">
                                    <span className="fprice mr-2">₦ {itemList[0]?.price}</span>
                                    <span className="sprice">₦ {itemList[0]?.price}</span>
                                </div>
                                <div className="firstcategory__timehead">
                                    <span>Limited Time Offer</span>
                                </div>
                                <div className="firstcategory__time d-flex">
                                    <div className="intertime-container">
                                    <div>
                                        <span className="intertime" id="dealhour">7</span>
                                        <span className="intertime-label">HOURS</span>
                                    </div>
                                    <span className="timedot">:</span>
                                    <div>
                                        <span className="intertime" id="dealminute">28</span>
                                        <span className="intertime-label">MINS</span>
                                    </div>
                                    <span className="timedot">:</span>
                                    <div>
                                        <span className="intertime" id="dealsecond">30</span>
                                        <span className="intertime-label">SECS</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="three-featured-items-total">
                            <div className="featured__products__header">
                                <h3 className='featured__items__header__big'>Featured Products</h3>
                            </div>
                            <div className="three-featured-items">
                                <div className="category__card__card featured-item">
                                    <div className="category__card__detail">
                                        <div className="category__name">
                                            <span>{itemList[1]?.name}</span>
                                        </div>
                                        <div className='category__description'>
                                            <span>{itemList[1]?.description}</span>
                                        </div>
                                    </div>
                                    <div className="category__image hover__img">
                                        <button
                                            className="center-button featured___button"
                                            onClick={(e) => {
                                            e.preventDefault();
                                            handleDetails(itemList[1]?.id);
                                            }}
                                        >
                                            Details
                                        </button>
                                        <img src={serverURL + itemList[1]?.image} alt="" className="product__img" />
                                    </div>
                                    <div className="featureditembottom">
                                        <div className="category__price">
                                            <span>₦ {itemList[1]?.price}</span>
                                        </div>
                                        <IconButton onClick={() =>handleAddToCart(itemList[1])} sx={{ borderRadius: '20px', width: '40px', height: '40px', background:'#eaeaea', '&:hover': { background: '#fdcd1b' } }}>
                                            <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'white' }} />
                                        </IconButton >
                                    </div>
                                </div>
                                <div className="featured-vertical-line"></div>
                                <div className="category__card__card featured-item">
                                    <div className="category__card__detail">
                                        <div className="category__name">
                                            <span>{itemList[2]?.name}</span>
                                        </div>
                                        <div className='category__description'>
                                            <span>{itemList[2]?.description}</span>
                                        </div>
                                    </div>
                                    <div className="category__image hover__img">
                                        <button
                                            className="center-button featured___button"
                                            onClick={(e) => {
                                            e.preventDefault();
                                            handleDetails(itemList[2]?.id);
                                            }}
                                        >
                                            Details
                                        </button>
                                        <img src={serverURL + itemList[2]?.image} alt="" className="product__img" />
                                    </div>
                                    <div className="featureditembottom">
                                        <div className="category__price">
                                            <span>₦ {itemList[2]?.price}</span>
                                        </div>
                                        <IconButton onClick={() => handleAddToCart(itemList[2])} sx={{ borderRadius: '20px', width: '40px', height: '40px', background:'#eaeaea', '&:hover': { background: '#fdcd1b' } }}>
                                            <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'white' }} />
                                        </IconButton >
                                    </div>
                                </div>
                                <div className="featured-vertical-line"></div>
                                <div className="category__card__card featured-item">
                                    <div className="category__card__detail">
                                        <div className="category__name">
                                            <span>{itemList[3]?.name}</span>
                                        </div>
                                        <div className='category__description'>
                                            <span>{itemList[3]?.description}</span>
                                        </div>
                                    </div>
                                    <div className="category__image hover__img">
                                        <button
                                            className="center-button featured___button"
                                            onClick={(e) => {
                                            e.preventDefault();
                                            handleDetails(itemList[3]?.id);
                                            }}
                                        >
                                            Details
                                        </button>
                                        <img src={serverURL + itemList[3]?.image} alt="" className="product__img" />
                                    </div>
                                    <div className="featureditembottom">
                                        <div className="category__price">
                                            <span>₦ {itemList[3]?.price}</span>
                                        </div>
                                        <IconButton onClick={() => handleAddToCart(itemList[3])} sx={{ borderRadius: '20px', width: '40px', height: '40px', background:'#eaeaea', '&:hover': { background: '#fdcd1b' } }}>
                                            <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'white' }} />
                                        </IconButton >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default FeaturedCategories;