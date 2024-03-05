import { useState, useEffect } from 'react';
import axios from 'axios';
import './TopItem.css';
import { serverURL } from '../../../config';
import ItemCard from '../../Card/ItemCard/ItemCard';

const TopItem = (props) => {
    const [ritemList, setRitemList] = useState([]);

    useEffect(() => {
        axios.post(serverURL + '/api/category/topitem', { cat_id: props.item.cat_id })
            .then(res => {
                console.log("topitem:", res.data.list);
                setRitemList(res.data.list);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="topitem__products">
            <div className="topitem__header__container">
                <div className="topitem__header">
                    <h2>Recommended Products</h2>
                </div>
                {/* <div className="topitem__header__line"></div> */}
            </div>
            <div className="topitem__card__container">
                <div className="topitem__product__card">
                    {/* {itemList && <FeaturedItems items={itemList} />} */}
                    {/* {itemList && itemList.map((item, index) => <TopItemCard key={index} item={item} />)} */}
                    {ritemList.map((item, index) => (
                        <ItemCard key={index} item={item} category="featured" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopItem;