import { useContext, useEffect, useState } from 'react';
import { WishItemsContext } from '../../Context/WishItemsContext';

import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './index.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotificationCard from '../Card/Notificationlist/NotificationCard';

const Wishlist = () => {
    const wishItems = useContext(WishItemsContext);
    const [fadeIn, setFadeIn] = useState(false);

    const messageItemList = useSelector((state) => state.category.messageList);
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
    // }, [isAuthenticated, navigate])
    const eiconostyle = {
        width: '100px',
        height: '100px',
        color: '#04AA6D'
    }

    return (
        <div className={`notificationlist fade-in ${fadeIn ? 'active' : ''}`}>
            <div className="notificationlist__container">
                <div className="notificationlist__header"><h1>Notifications</h1></div>
                <div className="notificationlist__items__container">
                    <div className="notificationlist__items">
                        {messageItemList.length > 0 ? messageItemList.map((item, index) => <NotificationCard key={item.id} item={item} />) : <div className='wish_empty'><RemoveShoppingCartIcon style={eiconostyle} /></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;