import React from "react";
import PropTypes from "prop-types";

const HamburgerMenu = ({ size, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="29.667" height="18.542" viewBox="0 0 29.667 18.542">
      <g id="menu" transform="translate(0 -96)">
        <g id="Grupo_369" data-name="Grupo 369" transform="translate(0 96)">
          <g id="Grupo_368" data-name="Grupo 368">
            <path
              id="Caminho_39"
              d="M29.049 96H.618a.618.618 0 1 0 0 1.236h28.431a.618.618 0 1 0 0-1.236z"
              class="cls-1"
              fill="#4f4d4d"
              data-name="Caminho 39"
              transform="translate(0 -96)"
            />
          </g>
        </g>
        <g id="Grupo_371" data-name="Grupo 371" transform="translate(0 104.653)">
          <g id="Grupo_370" data-name="Grupo 370">
            <path
              id="Caminho_40"
              d="M29.049 245.333H.618a.618.618 0 1 0 0 1.236h28.431a.618.618 0 1 0 0-1.236z"
              class="cls-1"
              fill="#4f4d4d"
              data-name="Caminho 40"
              transform="translate(0 -245.333)"
            />
          </g>
        </g>
        <g id="Grupo_373" data-name="Grupo 373" transform="translate(0 113.306)">
          <g id="Grupo_372" data-name="Grupo 372">
            <path
              id="Caminho_41"
              d="M29.049 394.667H.618a.618.618 0 1 0 0 1.236h28.431a.618.618 0 0 0 0-1.236z"
              class="cls-1"
              fill="#4f4d4d"
              data-name="Caminho 41"
              transform="translate(0 -394.667)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

HamburgerMenu.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

HamburgerMenu.defaultProps = {
  size: "30px",
  color: "#333"
};

export default HamburgerMenu;
