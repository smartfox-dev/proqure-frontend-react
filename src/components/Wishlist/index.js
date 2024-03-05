import { useContext, useEffect, useState } from 'react';
import { WishItemsContext } from '../../Context/WishItemsContext';
import WishCard from '../Card/Wishlist/WishCard';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './index.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const wishItems = useContext(WishItemsContext);
    const [fadeIn, setFadeIn] = useState(false);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        setFadeIn(true);
    }, []);

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/login');
    //     }
    // }, [isAuthenticated])
    const eiconostyle = {
        width: '100px',
        height: '100px',
        color: '#04AA6D'
    }

    return (
        <div className={`wishlist fade-in ${fadeIn ? 'active' : ''}`}>
            <div className="wishlist__container">
                <div className="wishlist__header"><h1>Wish Items</h1></div>
                <div className="wishlist__items__container">
                    <div className="wishlist__items">
                        {wishItems.items.length > 0 ? wishItems.items.map((item, index) => <WishCard key={item.id} item={item} />) : <div className='wish_empty'><RemoveShoppingCartIcon style={eiconostyle} /></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;