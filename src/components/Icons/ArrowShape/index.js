import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Svg = styled.svg`
  transition: transform 300ms;
  transform: ${({ direction }) => {
    if (direction === "left") {
      return "rotate(0deg)";
    } else if (direction === "right") {
      return "rotate(180deg)";
    }
  }};
`;

const ArrowShape = ({ direction, onClick }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="16.216"
      viewBox="0 0 10 16.216"
      direction={direction}
      onClick={onClick}
    >
      <path id="Shape" d="M10 1.892L8.108 0 0 8.108l8.108 8.108L10 14.324 3.784 8.108z" class="cls-1" fill="#757575" />
    </Svg>
  );
};

ArrowShape.propTypes = {
  direction: PropTypes.string,
  onClick: PropTypes.func
};

ArrowShape.defaultProps = {
  direction: "left",
  onClick: () => {}
};

export default ArrowShape;
