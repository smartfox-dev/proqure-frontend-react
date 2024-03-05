import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading';
import Item from '../components/Item/Item';
import { serverURL } from '../config';
import TopSubmenu from '../components/TopSubmenu/TopSubmenu';
import Footer from '../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirect } from '../store/slice/categorySlice';
import { setLogOut } from '../utils';

const ItemView = (props) => {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirect = useSelector((state) => state.category.redirect)  
    const [fadeIn, setFadeIn] = useState(false);
    const [loading, setLoading ] = useState(true);

    const [ item, setItem ] = useState();
    const [ ritemList, setRitemList] = useState([]);
    const [ review_list, setReviewList] = useState([]);
    const [ prating_list, setPRatingList] = useState([]);
    
    useEffect(() => {
        setLoading(true);
        axios.post(serverURL + '/api/category/item', { id: param.id })
            .then(res => {
                console.log("categoryItem", res.data)
                setItem(res.data.result);
                setRitemList(res.data.rresult);
                setReviewList(res.data.review_result);
                setPRatingList(res.data.rating_result);
                setTimeout(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setFadeIn(true);
                        window.scrollTo(0, 0);    
                    }, 500);
                  }, 1000);
            })
            .catch(err => console.log(err))

    }, [param.id])
    
    useEffect(() => {
      if (redirect) {
        dispatch(setRedirect(false));
        setLogOut();
        navigate("/login");
      }
    }, [redirect]);
    return (
      <>
        {loading ? (
          <ReactLoading type="spokes" className="m-auto entire-loading" />
        ) : (
          <>
            <div
              className={`justify-content-center container fade-in ${
                fadeIn ? "active" : ""
              }`}
            >
              {item && (
                <TopSubmenu title={item[0].cat_name} subtitle={item[0].name} />
              )}
              {item && ritemList && prating_list && (
                <Item
                  item={item[0]}
                  ritemList={ritemList}
                  reviewList={review_list}
                  prating_list={prating_list}
                />
              )}
            </div>
            <Footer />
          </>
        )}
      </>
    );
}
 
export default ItemView;