import ItemCarousel from './Carousel/ItemCarousel';
import Description from './Description/Description';
import Detail from './Detail/Detail';
import './Item.css';
import Related from './Related/Related';
import { FadeInSection } from '../FadeInSection/FadeInSection';
import FeaturedItems from '../Featured/Items/FetauredItems';
import CustomRating from './CustomRating/CustomRating';

const Item = (props) => {
    let item = props.item;
    let ritemList = props.ritemList;
    let reviewList = props.reviewList;
    let prating_list = props.prating_list;
    console.log("props:", props)
    return (
        <div className="item__container container">
            <div className="detail__and__carousel__container">
                <ItemCarousel item={item} ritemList={ritemList}/>
                <Detail item={item} />
            </div>
            <div className="item__description__container">
                <Description item={item} />
            </div>
            <FeaturedItems />
            <div className='custom-rating'>
                <CustomRating item={item} reviewList={reviewList} prating_list={prating_list}/>
            </div>
            {/* <div className="related__items__container">
                <Related item={props.item} ritemList={props.ritemList}/>
            </div> */}
        </div>
    );
}

export default Item;