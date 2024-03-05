import { useNavigate } from "react-router-dom";
import "./TopSubmenu.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { isEmpty } from "../../utils";
const TopSubmenu = (props) => {
  const navigage = useNavigate();
  const handleClick = (params) => {
    navigage(params)
  }
  return (
    <div className="top__sidebar">
      {/* Navigation Path */}
      <span onClick={(e) => {e.preventDefault();handleClick("/")}} className="subtopfirst"><span>Home</span></span>
      <span className="subtopgt"><ArrowForwardIosIcon style={{width:'12px'}}/></span> 
      <span className="subtopsecond">{props.title}</span>
      {!isEmpty(props.subtitle) ?
        <div className="subtotaltop">
          <span className="subtopgt"><ArrowForwardIosIcon style={{width:'12px'}}/></span> 
          <span className="subtopfirst">{props.subtitle}</span>
        </div>
      : ""}
    </div>
  );
};

export default TopSubmenu;