import React from "react";
import MuiButton from "@material-ui/core/Button";
import * as styles from "./style";

const Button = ({ href }) => {
  return (
    <styles.Button>
      <MuiButton href={href}>Profile</MuiButton>
    </styles.Button>
  );
};

export default Button;
