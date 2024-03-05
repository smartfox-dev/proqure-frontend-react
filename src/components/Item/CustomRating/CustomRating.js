import "./CustomRating.css";
import OurRatingImg from "../../../assets/images/itemview/ourrating.png";
import { serverURL } from "../../../config";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { diffWeekFromDays, isEmpty, isValidEmail } from "../../../utils";
import { toastr } from "../../../utils/toastr";
import { setRegisterReview } from "../../../store/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#6a6f73',
  },
}));

const CustomRating = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [reivewRatingValue, setReviewRating] = useState(5);
  const [description, setDescription] = useState('');
  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [review_list, setReviewList] = useState([]);
  const [temp_pratinglist, setTempPratingList] = useState([]);;
  let mreviewList = useSelector((state) => state.category.reviewList);
  let item = props.item;
  console.log("item:",item)
  let prating_list = props.prating_list;
  let starValueList = [5, 4, 3, 2, 1];
  
  const handleReview = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    let totalRatings = ((item.ratings * item.reviews_count + Number(reivewRatingValue))/(item.reviews_count + 1)).toFixed(1);
    if(reivewRatingValue === 0 || description === '' || user_name === '' || user_email === ''){
      toastr.warning("Input field is required");
      return;
    }
    else if(!isValidEmail(user_email)){
      toastr.warning("Incorrect email address");
      return;
    }
    let data = { user_id: userInfo.id, product_id: item.id, ratings: reivewRatingValue,totalRatings: totalRatings, description:description, user_name: user_name, user_email: user_email};
    console.log("review_data:", data);
    dispatch(setRegisterReview(data));
    window.scrollTo(0, 0);
    // initReview();
  };
  
  const initReview = () => {
    setReviewRating(5);
    setDescription('');
    setUserEmail('');
    setUserName('');
  }

  useEffect(() => {
    let tempArray = {5:0, 4:0, 3:0, 2:0, 1:0};
    if(!isEmpty(prating_list)){
      console.log("Prating_list:", prating_list);
      let totalcount = 0;
      for(let i=0;i< prating_list.length;i++) {
        totalcount += Number(prating_list[i].count);
      }
      for(let j=0;j<prating_list.length;j++) {
        // tempArray.push({ratings: ratingValueList[j], barValue: !isEmpty(prating_list[j].ratings) ? parseInt((100*prating_list[j].ratings)/totalcount) : 0})
        tempArray[prating_list[j].ratings] = parseInt(100*(prating_list[j].count)/totalcount);
      }
      console.log("tempArray", tempArray)
    }
    setTempPratingList(tempArray)
  },[prating_list]);

  useEffect(() => {
    if(!isEmpty(mreviewList)){
      setReviewList(mreviewList);
    }
  }, [mreviewList]);
  
  useEffect(() => {
    setReviewList(props.reviewList);
  }, [props.reviewList])


  return (
    <div className="product__customrating__product">
      <div className="customrating__img__container">
        <div className="customrating__header">Verified Customer Ratings</div>
        <div className="d-flex">
          <div className="customratingimg">
            <span>{item.ratings.toFixed(1)}</span>
            <img src={OurRatingImg} alt="customimg.png" />
          </div>
          <div className="costom-rating-progressbar-body">
            {
              temp_pratinglist && starValueList.map((item, index) => (
              <div className="custom-rating-progressbar-element" key={index}>
                <div className="custom-rating-progressbar">
                  <BorderLinearProgress variant="determinate" value={temp_pratinglist[starValueList[index]]} />
                </div>
                <Rating
                  name="half-rating"
                  value={starValueList[index]} // Set the rating value based on each item's ratings
                  precision={1}
                  style={{marginRight:'10px'}}
                />
                <div className="d-inline-grid" style={{marginBottom:'10px'}}>
                  <span className="rating-value">{temp_pratinglist[starValueList[index]]}%</span>
                  <span className="rating-horizontal-line"></span>
                </div>
              </div>
              ))
            }

          </div>

        </div>
      </div>
      <div className="customrating__specifics__container">
        <div className="customrating__specifics">
          <div className="customrating__header__line"></div>
          <div className="customrating__highlights__header">
            Customer Reviews
          </div>
          {review_list && review_list.map((item, index) => (
            <div className="each__review__item" key={index}>
              <div className="customrating__highlights__content">
                <div className="customrating__avatar">
                  <img src={serverURL + item.avatar} alt="review.png" />
                </div>
                <div className="customrating__total__detail">
                  <div className="custom__total_detail__name">
                    {item.user_name}
                  </div>
                  <div className="d-flex">
                    <Rating
                      name="half-rating"
                      value={item.ratings} // Set the rating value based on each item's ratings
                      precision={1}
                    />
                    <div className="custom__user__date">{diffWeekFromDays(item.created_at)}</div>
                  </div>
                  <div className="custom__total_detail__info">
                    {item.description}
                  </div>
                </div>
              </div>
              <div className="horizontal-line"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="customrating__header__container">
        <div className="customrating__header">Add a Review</div>
      </div>
      <div className="customrating__detail__container">
        <div className="custom-add-rating">
          <div className="custom-yourrating">Your Rating</div>
          <Rating
            className="custom-add-yourrating"
            name="half-rating"
            value={parseFloat(reivewRatingValue)}
            precision={1}
            min={0}
            max={5}
            onChange={(e) => {e.preventDefault();setReviewRating(e.target.value);}}
          />
        </div>
        <div className="custom-add-general">
          <div className="custom-add-generaltext">
            Your Review <span className="custom-add-general-star">*</span>
          </div>
          <div className="custom_add_form_droup">
            <textarea type="text" placeholder="" name="description" value={description} onChange={(e) => {
              e.preventDefault();setDescription(e.target.value);
            }}></textarea>
          </div>
        </div>
        <div className="custom-add-general">
          <div className="custom-add-generaltext">
            Your Name <span className="custom-add-general-star">*</span>
          </div>
          <div className="custom_add_form_droup">
            <input type="text" placeholder="" name="userName" value={user_name} onChange={(e) => {
              e.preventDefault();setUserName(e.target.value);
            }}/>
          </div>
        </div>
        <div className="custom-add-general">
          <div className="custom-add-generaltext">
            Your Email <span className="custom-add-general-star">*</span>
          </div>
          <div className="custom_add_form_droup">
            <input type="text" placeholder="" name="companyName" value={user_email} onChange={(e) => {
              e.preventDefault();setUserEmail(e.target.value);
            }}/>
          </div>
        </div>
      </div>
      <div>
        <FormControlLabel
          className="custom-detauk-add-check"
          control={<Checkbox className="custom-checkbox checkboxclass" />}
          label="Save my name and email on this website incase of next time I comment"
        />
      </div>
      <div className="add__cart">
        <LoadingButton
          loading={isLoading}
          startIcon={
            isLoading && <CircularProgress size={20} color="inherit" />
          }
          sx={{
            color: "#fff",
            bgcolor: "#04AA6D",
            "&:hover": {
              bgcolor: "#0ebb7c",
            },
            textalign: "center",
            alignself: "center",
            padding: "6px 10px",
            fontSize: "15px",
            width: "150px",
          }}
          onClick={(e) => {
            e.preventDefault();
            setIsLoading(true);
            handleReview();
          }}
        >
          <span className="ml-1">Add Review</span>
        </LoadingButton>
      </div>
    </div>
  );
};

export default CustomRating;
