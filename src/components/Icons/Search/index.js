import React from "react";
import PropTypes from "prop-types";

const Search = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21.998" height="21.881" viewBox="0 0 21.998 21.881">
      <g id="magnifying-glass" transform="translate(-.049 -.004)">
        <path
          id="search-icon"
          d="M21.855 20.878l-5.346-5.346a9.378 9.378 0 1 0-7.079 3.229 9.725 9.725 0 0 0 6.247-2.448l5.346 5.346a.663.663 0 0 0 .463.2c.166 0 .241.083.368-.049a.66.66 0 0 0 0-.932zM1.146 9.38A8.54 8.54 0 0 1 9.43 1a8.507 8.507 0 0 1 8.247 8.38 8.415 8.415 0 0 1-8.247 8.276A8.448 8.448 0 0 1 1.146 9.38z"
          className="cls-1"
          fill={color}
          data-name="Search Icon"
        />
      </g>
    </svg>
  );
};

Search.propTypes = {
  color: PropTypes.string
};

Search.defaultProps = {
  color: "#00c3cb"
};

export default Search;
