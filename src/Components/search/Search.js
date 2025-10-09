import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCityOptions } from "../../APIs/SearchAPI.js";
import PropTypes from "prop-types";
import "./search.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    const options = await fetchCityOptions(inputValue);
    return { options };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#f2f2f2",
      borderRadius: "8px",
      minHeight: "48px",
      border: state.isFocused ? "1px solid #007BFF" : "none",
      boxShadow: state.isFocused ? "0 0 0 1px #007BFF" : "none",
      "&:hover": {
        borderColor: "#a0a0a0",
      },
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "black",
      fontSize: "18px",
    }),

    input: (provided) => ({
      ...provided,
      color: "black",
    }),

    menu: (provided) => ({
      ...provided,
      color: "black",
      borderRadius: "8px",
      marginTop: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      zIndex: 99,
    }),

    option: (provided, state) => {
      let backgroundColor;
      if (state.isSelected) {
        backgroundColor = "#007BFF";
      } else if (state.isFocused) {
        backgroundColor = "#e6f7ff";
      } else {
        backgroundColor = null;
      }
      return {
        ...provided,
        backgroundColor,
        color: state.isSelected ? "white" : "black",
        padding: "12px 20px",
        cursor: "pointer",
      };
    },

    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <div className="searchbar-container">
      <AsyncPaginate
        styles={customStyles}
        classNamePrefix="searchbar"
        placeholder="Search City"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};
Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;
