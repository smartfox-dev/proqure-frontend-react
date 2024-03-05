import { useState, useEffect } from 'react';
import axios from 'axios';
import './Related.css';
import { serverURL } from '../../../config';
import ItemCard from '../../Card/ItemCard/ItemCard';

const Related = (props) => {
    const [ritemList, setRitemList] = useState([]);

    useEffect(() => {
        axios.post(serverURL + '/api/category/related', { cat_id: props.item.cat_id })
            .then(res => {
                console.log("related:", res.data.list);
                setRitemList(res.data.list);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="related__products">
            <div className="related__header__container">
                <div className="related__header">
                    <h2>Recommended Products</h2>
                </div>
                {/* <div className="related__header__line"></div> */}
            </div>
            <div className="related__card__container">
                <div className="related__product__card">
                    {/* {itemList && <FeaturedItems items={itemList} />} */}
                    {/* {itemList && itemList.map((item, index) => <RelatedCard key={index} item={item} />)} */}
                    {ritemList.map((item, index) => (
                        <ItemCard key={index} item={item} category="featured" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Related;