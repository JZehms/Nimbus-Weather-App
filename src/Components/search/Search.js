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

  return (
<div className="searchbar-container">
      <AsyncPaginate
        className="searchbar"
        placeholder="Search for city"
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