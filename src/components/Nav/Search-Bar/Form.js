import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "./Form.css";
import { useContext } from "react";
import { SearchContext } from "../../../Context/SearchContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { isEmpty } from "../../../utils";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Form = () => {
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();
  const citemList = useSelector((state) => state.category.citemList);
  const searchList = useSelector((state) => state.category.searchList);
  const [mcitemList, setCitemList] = useState([]);
  const [selectedCategory, setSelectCategory] = useState("");

  const [selectedValue, setSelectedValue] = useState(null);

  const handleAutocompleteChange = (event, value) => {
    setSelectedValue(value);
  };
  const handelFormSubmit = (e) => {
    e.preventDefault();
    console.log("selected Value:", selectedValue);
    // searchContext.setSearchQuery(selectedValue)
    // navigate('/search')
    if (!isEmpty(selectedValue)) {
      let strUrl = "/item/" + selectedValue.id;
      navigate(strUrl);
    }
  };
  const changeCategory = (value) => {
    setSelectCategory(value);
  };

  useEffect(() => {
    setCitemList(citemList);
    console.log("====categoryList:", citemList);
  }, [citemList]);

  useEffect(() => {
    const inputElement = document.querySelector(".MuiAutocomplete-input");
    inputElement.placeholder = "Search for products";
  }, []);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1000); // For demo purposes.
      console.log("searchList2:", searchList);
      if (active && !isEmpty(searchList)) {
        setOptions([...searchList]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading, searchList]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  
  return (
    <form className="search__form" onSubmit={handelFormSubmit}>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: "100%" }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        value={selectedValue}
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField
            className="autocomplete_textfield"
            // label="Search for products"
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>{params.InputProps.endAdornment}</Fragment>
              ),
            }}
          />
        )}
      />
      {/* <input type="text" placeholder='Search for products' className="search__form__input" value={searchInput} onChange={handelChange} required /> */}
      {/* <div className="search-dropdown">
                <select
                    className="selectcategoryclass"
                    value={selectedCategory}
                    onChange={(e) => {
                    e.preventDefault();
                    changeCategory(e.target.value);
                    }}
                >
                    <option key='all' value="all">All categories</option>
                    {mcitemList && mcitemList.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div> */}
      <button className="search__form__button" type="submit">
        <SearchIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default Form;

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
export const topFilms = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];
