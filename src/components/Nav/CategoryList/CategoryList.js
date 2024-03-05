import { useSelector } from "react-redux";
import "./CategoryList.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { setItemList, setRitemList } from "../../../store/slice/categorySlice";
import { useDispatch } from "react-redux";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigage = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo)
  const citemList = useSelector((state) => state.category.citemList);
  const [mcitemList, setCitemList] = useState([]);

  const handleClick = (item) => {
    console.log("shopbycategorisitem:", item);
    if (item === "all") {
      let params = {
        user_id: userInfo.id,
        user_email: userInfo.email,
      };
      dispatch(setItemList(params));
    } else {
      let params = { cat_id: item.id };
      dispatch(setRitemList(params));
    }
    navigage('/shop');
  };

  useEffect(() => {
    setCitemList(citemList);
  }, [citemList]);
  return (
    <div className="topcategory__bar__container">
      <div className="topcategory__container">
        <div className="headerdropdown" id="ndropdown-btn">
          <div className="category-dropdown">
            <button className="category-dropbtn">
              Shop by categories{" "}
              <KeyboardArrowDownIcon style={{ width: "15px" }} />
            </button>
            <div className="category-dropdown-content">
              <a href="/" onClick={(e) => { e.preventDefault(); handleClick("all"); }} value={"all"} > {"All"} </a>
                {mcitemList &&
                  mcitemList.map((item, index) => (
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(item);
                      }}
                      key={index}
                      value={item.id}
                    >
                      {item.name}
                    </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
