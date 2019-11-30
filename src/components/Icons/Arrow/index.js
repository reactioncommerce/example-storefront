import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Svg = styled.svg`
  transition: transform 300ms;
  transform: ${({ direction }) => {
    if (direction === "up") {
      return "rotate(180deg)";
    } else if (direction === "down") {
      return "rotate(0deg)";
    }
  }};
`;

const Arrow = ({ direction }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" direction={direction} width="16.216" height="10" viewBox="0 0 16.216 10">
      <path
        id="arrow-shape"
        d="M0 1.892L1.892 0 10 8.108l-8.108 8.108L0 14.324l6.216-6.216z"
        className="cls-1"
        fill="#fff"
        transform="rotate(90 8.108 8.108)"
      />
    </Svg>
  );
};

Arrow.propTypes = {
  direction: PropTypes.string
};

Arrow.defaultProps = {
  direction: "up"
};

export default Arrow;
