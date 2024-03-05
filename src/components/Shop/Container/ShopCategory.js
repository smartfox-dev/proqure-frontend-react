import { useEffect, useState } from "react";
import ItemCard from "../../Card/ItemCard/ItemCard";
import './ShopCategory.css';

const ShopCategory = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="shop__category__container" id={'shop_container' + props.id}>
            <div className="shop__category__card__container">
                <div className="shop__category__product__card">
                    {props.items.map((data, index) => <ItemCard key={index} item={data} category={props.category} />)}
                </div>
            </div>
        </div>
    );
}

export default ShopCategory;