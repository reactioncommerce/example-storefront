import React from "react";
import PropTypes from "prop-types";
import { withTheme } from "material-ui/styles";

const Small = ({ ...props }) => {
  const { children, theme: { typography } } = props;
  console.log(typography)
  return (
    <div style={{ ...typography.body1, ...typography.smallText }}>
      {children}
    </div>
  );
};

Small.propTypes = {
  children: PropTypes.string,
  theme: PropTypes.object.isRequired
};

export default withTheme()(Small);
