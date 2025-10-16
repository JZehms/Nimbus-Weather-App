import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCityOptions } from "../../APIs/SearchAPI.js";
import { FaSearch } from "react-icons/fa";
import { components } from "react-select";
import PropTypes from "prop-types";
import "./search.css";

const CustomDropdownIndicator = (props) => {
  const iconColor = props.isFocused ? "#ffffff" : "rgba(255, 255, 255, 0.9)";
  return (
    <components.DropdownIndicator {...props}>
      <FaSearch style={{ marginRight: "6px" }} size={18} color={iconColor} />
    </components.DropdownIndicator>
  );
};

CustomDropdownIndicator.propTypes = {
  isFocused: PropTypes.bool,
};

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
      width: "100%",
      maxWidth: "none",
      minWidth: "auto",

      backgroundColor: "transparent",

      border: "1px solid rgba(255, 255, 255, 0.4)",

      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(255, 255, 255, 0.6)"
        : "none",

      minHeight: "60px",
      borderRadius: "16px",
      transition: "all 0.3s ease",
      cursor: "text",
      "&:hover": {
        border: "1px solid rgba(255, 255, 255, 0.7)",
      },
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      padding: "0 25px 0 35px",
      height: "100%",
      alignItems: "center",
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
      borderRadius: "16px",
      transition: "background-color 0.3s ease",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: "18px",
      fontWeight: "400",
      margin: 0,
    }),

    input: (provided) => ({
      ...provided,
      color: "#ffffff",
      fontSize: "18px",
      margin: 0,
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
      fontSize: "22px",
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: "0 20px 0 0",
      color: state.isFocused ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
      "&:hover": {
        color: "#ffffff",
      },
    }),

    indicatorSeparator: () => ({ display: "none" }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      border: "1px solid #d0d0d0",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      marginTop: "8px",
      zIndex: 99,
    }),

    option: (provided, state) => {
      let backgroundColor;
      if (state.isSelected) {
        backgroundColor = "#005a9e";
      } else if (state.isFocused) {
        backgroundColor = "#eaf3fb";
      } else {
        backgroundColor = "transparent";
      }

      const color = state.isSelected ? "#ffffff" : "#1a1a1a";

      return {
        ...provided,
        backgroundColor,
        color,
        padding: "14px 20px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background 0.1s ease",
      };
    },
  };

  return (
    <div className="searchbar-component-wrapper">
      <AsyncPaginate
        styles={customStyles}
        classNamePrefix="searchbar"
        placeholder="Search City"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    </div>
  );
};

Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;
