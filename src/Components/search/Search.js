import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCityOptions } from "../../APIs/SearchAPI.js";
import { FaSearch } from "react-icons/fa";
import { components } from "react-select";
import PropTypes from "prop-types";
import "./search.css";

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FaSearch
        style={{ marginRight: "6px" }}
        size={18}
        color={props.isFocused ? "#005a9e" : "#444"}
      />
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
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      minHeight: "48px",
      border: state.isFocused ? "2px solid #005a9e" : "1.5px solid #757575",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(0, 90, 158, 0.3)" : "none",
      transition: "all 0.2s ease",
      outline: "none",
      "&:hover": {
        borderColor: "#005a9e",
      },

      width: "100%",
      maxWidth: "500px",
      minWidth: "200px",
      cursor: "text",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#444",
      fontSize: "16px",
    }),

    input: (provided) => ({
      ...provided,
      color: "#1a1a1a",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#1a1a1a",
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      border: "1px solid #d0d0d0",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
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
        padding: "12px 18px",
        cursor: "pointer",
        fontSize: "15px",
        transition: "background 0.1s ease",
      };
    },

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#005a9e" : "#444",
      "&:hover": {
        color: "#005a9e",
      },
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
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    </div>
  );
};
Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;
