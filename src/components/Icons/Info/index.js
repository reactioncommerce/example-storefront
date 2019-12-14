import React from "react";
import PropTypes from "prop-types";

const Info = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22.8" height="22.8" viewBox="0 0 22.8 22.8">
      k
      <g id="Grupo_377" data-name="Grupo 377" transform="translate(-52.7 -619.638)">
        <path
          id="Path"
          d="M10.9 0A10.9 10.9 0 1 1 0 10.9 10.9 10.9 0 0 1 10.9 0z"
          fill="none"
          stroke={color}
          className="cls-1"
          transform="translate(53.2 620.138)"
        />
        <path
          id="Path-2"
          d="M2.725 1.362A1.362 1.362 0 1 1 1.362 0a1.362 1.362 0 0 1 1.363 1.362z"
          fill={color}
          stroke="#FFF"
          strokeWidth=".9px"
          className="cls-2"
          data-name="Path"
          transform="translate(62.738 635.125)"
        />
        <path
          id="Path-3"
          d="M6.694 1.041A3.848 3.848 0 0 0 3.913 0C1.537 0 0 1.689 0 4.3h2.192c0-1.62.9-2.194 1.676-2.194a1.441 1.441 0 0 1 1.487 1.342c.068.923-.425 1.392-1.049 1.985a4.013 4.013 0 0 0-1.561 3.78h2.186A2.872 2.872 0 0 1 5.95 6.839a4.883 4.883 0 0 0 1.674-3.294 3.412 3.412 0 0 0-.931-2.5z"
          className="cls-2"
          data-name="Path"
          transform="translate(60.287 624.549)"
        />
      </g>
    </svg>
  );
};

Info.propTypes = {
  color: PropTypes.string
};

Info.defaultProps = {
  color: "#4f4d4d"
};

export default Info;
