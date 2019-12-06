import React from "react";
import PropTypes from "prop-types";

const Favorite = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22.6" height="20.599" viewBox="0 0 22.6 20.599">
      <path
        id="Shape"
        d="M11 20a.225.225 0 0 1-.158-.065l-8.932-8.86a6.47 6.47 0 0 1 0-9.179A6.593 6.593 0 0 1 11 1.743a6.588 6.588 0 0 1 9.09.157 6.469 6.469 0 0 1 0 9.179l-8.929 8.86A.226.226 0 0 1 11 20zM6.536.446a6.035 6.035 0 0 0-4.308 10.313L11 19.462l8.771-8.7a6.024 6.024 0 0 0 0-8.549 6.134 6.134 0 0 0-8.611 0 .226.226 0 0 1-.318 0A6.079 6.079 0 0 0 6.536.446z"
        className="cls-1"
        fill={color}
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth=".6px"
        transform="translate(.3 .299)"
      />
    </svg>
  );
};

Favorite.propTypes = {
  color: PropTypes.string
};

Favorite.defaultProps = {
  color: "#4f4d4d"
};

export default Favorite;
