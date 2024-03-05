import { Link, useNavigate } from 'react-router-dom';
import './CategoryCard.css'
import { Button } from '@mui/material';
import { serverURL } from '../../../config';
const CategoryCard = (props) => {
    const parameter = props.data.id;
    const navigate = useNavigate();
    const handleClick = (id) => {
        let strId = 'shop_container' + id;
        window.localStorage.setItem('shop_containerid', strId);
        navigate('/shop');
    };

    return (
        <div className="category__card__card guide-container">
            {/* <button className="guide-center-button" onClick={(e) => { e.preventDefault(); handleClick(props.data.id) }}>Details...</button> */}
            <div className="category__image">
                <img src={serverURL + props.data.image} alt="" className="product__img" />
            </div>
            <div className="category__card__detail">
                <div className="category__name">
                    <span>{props.data.name}</span>
                </div>
                <div className='category__description'>
                    <span>{props.data.description}</span>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;