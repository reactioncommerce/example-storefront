import React from "react";
import PropTypes from "prop-types";

const User = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22.12" height="22.246" viewBox="0 0 22.12 22.246">
      <g id="Grupo_393" data-name="Grupo 393" transform="translate(-32.94 -529)">
        <g id="Group_43" data-name="Group 43" transform="translate(33 530)">
          <path
            id="Shape"
            strokeWidth=".12px"
            d="M19.963 11.408H2.037A2.039 2.039 0 0 1 0 9.371 9.381 9.381 0 0 1 9.371 0h3.259A9.381 9.381 0 0 1 22 9.371a2.039 2.039 0 0 1-2.037 2.037zM9.371.815A8.566 8.566 0 0 0 .815 9.371a1.224 1.224 0 0 0 1.222 1.222h17.926a1.231 1.231 0 0 0 .864-.358 1.214 1.214 0 0 0 .358-.864A8.556 8.556 0 0 0 12.63.815z"
            class="cls-1"
            fill={color}
            transform="translate(0 9.778)"
          />
        </g>
        <g
          id="Elipse_1"
          class="cls-2"
          fill="none"
          stroke={color}
          strokeWidth=".9px"
          data-name="Elipse 1"
          transform="translate(39 529)"
        >
          <circle cx="5" cy="5" r="5" class="cls-3" stroke="none" />
          <circle cx="5" cy="5" r="4.55" class="cls-4" fill="none" />
        </g>
      </g>
    </svg>
  );
};

User.propTypes = {
  color: PropTypes.string
};

User.defaultProps = {
  color: "#4f4d4d"
};

export default User;
