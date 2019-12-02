import React from "react";
import PropTypes from "prop-types";
import MuiButton from "@material-ui/core/Button";
import * as styles from "./style";

const Button = ({ children, primary, secondary, href, customStyles, onClick }) => {
  return (
    <styles.Button primary={primary} secondary={secondary} customStyles={customStyles}>
      <MuiButton href={href} onClick={onClick}>
        {children}
      </MuiButton>
    </styles.Button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  customStyles: PropTypes.any,
  href: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool
};

Button.defaultProps = {
  primary: false,
  secondary: false
};

export default Button;
