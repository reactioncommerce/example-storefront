import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

const date = new Date();

const styles = () => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const Footer = ({ ...props }) => (
  <footer className={props.classes.footer}>
    <Typography variant="caption">
      &copy; {date.getFullYear()} Reaction Commerce
    </Typography>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Footer);
