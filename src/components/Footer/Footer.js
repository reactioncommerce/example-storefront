import React from "react";
import PropTypes from "prop-types";
import Small from "components/Typography/Small";
import { withStyles } from "material-ui/styles";

const date = new Date();

const styles = () => ({
  footer: {
    height: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const Footer = ({ ...props }) => (
  <footer className={props.classes.footer}>
    <Small>&copy; {date.getFullYear()} Reaction Commerce</Small>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Footer);
