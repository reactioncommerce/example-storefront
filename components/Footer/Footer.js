import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const date = new Date();

const styles = (theme) => ({
  footer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2)
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

export default withStyles(styles, { name: "SkFooter" })(Footer);
