import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const date = new Date();

const styles = (theme) => ({
  footer: {
    marginTop: 'auto',
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: '#2667e5',
    color: '#fff',
    padding: 20,
  }
});

const Footer = ({ ...props }) => (
  <footer className={props.classes.footer}>
    <Typography variant="caption">
    </Typography>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles, { name: "SkFooter" })(Footer);
