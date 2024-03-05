import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";
import "./NotificationCard.css";

import {
  updateDateTimeFormat,
  emoticonArray,
  getRandomNumber,
} from "../../../utils";
import { removeMessageItem } from "../../../store/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const NotificationCard = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo)
  const messageItemList = useSelector((state) => state.category.messageList);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handelRemoveItem = () => {
    let params = { id: props.item.id, user_id: userInfo.id };
    dispatch(removeMessageItem(params));
  };

  return (
    <div className="notificationcard">
      
      <div className="notification_content">
        <div className="notification__item__title">✎𓂃{props.item.title}。°˖⌕
        </div>
        <span className="notification__item__content">
          {emoticonArray[getRandomNumber(1, 20)]}{props.item.content}
        </span>
      </div>
      <div className="notification__remove__item__icon">
        <IconButton onClick={handelRemoveItem} style={{padding:'0'}}>
          <HighlightOffIcon style={{width:'22', height: '22', fill:'#04aa6d', marginRight:"0"}}/>
        </IconButton>
      </div>
      <div className="notification_card_datetime">
        🕔{updateDateTimeFormat(props.item.created_at)}
      </div>
    </div>
  );
};

export default NotificationCard;
