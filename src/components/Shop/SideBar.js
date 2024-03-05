import "./Shop.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import FormGroup from "@mui/material/FormGroup";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveIcon from "@mui/icons-material/Remove";
import Checkbox from "@mui/material/Checkbox";
import { Radio } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { checkItemInList, isEmpty } from "../../utils";
import { setFilterList } from "../../store/slice/categorySlice";


const SideBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const sortedItemList = useSelector((state) => state.category.sortedItemList);
  const shopItemList = useSelector((state) => state.category.shopItemList);
  const searchList = useSelector((state) => state.category.searchList);
  const minmaxPrice = useSelector((state) => state.category.minmaxPrice);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [brandItemList, setBrandItemList] = useState([]);
  const [bnplItem, setBnplItem] = useState(0);
  const [moreFlag, setMoreFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [minmaxValue, setMinMaxValue] = useState([
    minmaxPrice.min_price,
    minmaxPrice.max_price,
  ]);

  const valuetext = (value) => {return `${value}°C`;}
  
  const handleBrandItem = (data) => {
    if (checkItemInList(brandItemList, data)) {
      const index = brandItemList.findIndex((item) => item === data);
      if(index >= 0){
        brandItemList.splice(index, 1)
      }
    } else {
      brandItemList.push(data);
    }
    console.log("brandItemList", brandItemList);
    setBrandItemList(brandItemList);
  };

  const handleBnplItem = (checkboxId) => {
    console.log("handleBnplItem", checkboxId);
    if (selectedCheckbox === checkboxId) {
      setSelectedCheckbox(null); // Unselect the item if it is already selected
      setBnplItem(0)
    } else {
      setSelectedCheckbox(checkboxId); // Select the item if it is not selected
      setBnplItem(checkboxId);
    }
    console.log("bnplItem:", bnplItem);
  }; 

  const handleDetails = (id) => {
    let strUrl = "/item/" + id;
    navigate(strUrl);
  };

  const handleChange = (event, newValue) => {
    setMinMaxValue(newValue);
  };

  const handleFilter = () => {
    let data = {brandItemList: brandItemList, bnplItem: bnplItem, minmaxValue: minmaxValue};
    console.log("brandItemList:", data);
    setTimeout(() => {
      dispatch(setFilterList(data));
      setIsLoading(false);
    }, 3000);
  };
  
  const handleShowMore = () => {
    setMoreFlag(!moreFlag);
  };

  useEffect(() => {
    if (!isEmpty(minmaxPrice)) {
      setMinMaxValue([minmaxPrice.min_price, minmaxPrice.max_price]);
    }
  }, [minmaxPrice]);

  return (
    <div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          flexGrow: 1,
          maxWidth: 300,
          minWidth: 250,
          overflowY: "auto",
          borderRadius: "3px",
        }}
      >
        <table className="outermostItems">
          <tbody>
            <tr>
              <td className="treeviewbrowse">Browse Categories</td>
            </tr>
            {sortedItemList &&
              sortedItemList.map((sortedItem, index) => (
                <tr key={index}>
                  <td>
                    <TreeItem
                      key={index}
                      nodeId={index.toString()}
                      label={
                        <span style={{ fontSize: "18px" }}>
                          {sortedItem.cat_name} ({sortedItem.items.length})
                        </span>
                      }
                    >
                      {sortedItem.items &&
                        sortedItem.items.map((child, childIndex) => (
                          <TreeItem
                            className="shoptreeviewinneritem"
                            key={childIndex}
                            nodeId={(childIndex + 1000).toString()}
                            label={
                              <span style={{ fontSize: "18px" }}>
                                {child.name}
                              </span>
                            }
                            onClick={(e) => {
                              handleDetails(child.id);
                            }}
                          />
                        ))}
                    </TreeItem>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TreeView>
      <div className="totalfilters">
        <div className="totalfilterheader">
          <span className="underline">Filters</span>
        </div>
      </div>
      <FormGroup className="filtersbrand">
        <span className="brandtitle">Brands</span>
        <div className="brandoptions">
          {searchList &&
            searchList
              .slice(0, moreFlag ? searchList.length : 5)
              .map((item, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    // e.preventDefault();
                    handleBrandItem(item.id);
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox className="checkboxclass" />}
                    label={
                      <span style={{ fontSize: "18px" }}>{item.name}</span>
                    }
                  />
                </div>
              ))}
        </div>
        <div
          className="filters-showmore"
          onClick={(e) => {
            e.preventDefault();
            handleShowMore();
          }}
        >
          {moreFlag ? (
            <div>
              <RemoveIcon style={{ width: "20px", marginRight: "10px" }} />
              Show less
            </div>
          ) : (
            <div>
              <AddSharpIcon style={{ width: "20px", marginRight: "10px" }} />
              Show more
            </div>
          )}
        </div>
      </FormGroup>
      <div className="totalbnpl">
        <div className="totalbnplheader"></div>
      </div>
      <div className="bnpltotal">
        <span className="bnpltitle">BNPL Available?</span>
        <FormControlLabel
          onClick={(e) => {
            handleBnplItem(1);
          }}
          checked={selectedCheckbox === 1}
          control={<Checkbox className="checkboxclass" />}
          label={<span style={{ fontSize: "18px" }}>Yes</span>}
        />
        <FormControlLabel
          onClick={(e) => {
            handleBnplItem(2);
          }}
          checked={selectedCheckbox === 2}
          control={<Checkbox className="checkboxclass" />}
          label={<span style={{ fontSize: "18px" }}>No</span>}
        />
      </div>
      <div className="totalbnpl">
        <div className="totalbnplheader"></div>
      </div>
      <Box sx={{ width: 300, marginTop: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="slideprice slidetop">Price</div>
          <div className="slideapply slidetop">Apply</div>
        </Box>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={minmaxValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          className="moneyslider"
          min={minmaxPrice && minmaxPrice.min_price}
          max={minmaxPrice && minmaxPrice.max_price}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="slidemin slidebottom">
            Min: {minmaxPrice.min_price}₦
          </div>
          <div className="slidemax slidebottom">
            Max: {minmaxPrice.max_price}₦
          </div>
        </Box>
      </Box>
      <LoadingButton
        loading={isLoading}
        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
        sx={{
          color: "#fff",
          bgcolor: "#04AA6D",
          "&:hover": {
            bgcolor: "#0ebb7c",
          },
          textalign: "center",
          alignself: "center",
          width: "100%",
          fontSize: "16px",
          marginY: "20px",
        }}
        onClick={(e) => {
          e.preventDefault();
          setIsLoading(true);
          handleFilter();
        }}
      >
        <span className="ml-1">Filter</span>
      </LoadingButton>
    </div>
  );
};

export default SideBar;
