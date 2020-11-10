import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const date = new Date();

const styles = (theme) => ({
  footer: {
    alignItems: "center",
    display: "flex",
    backgroundColor: '#2667e5',
    color: '#fff',
  },
  footerLink: {
    textDecoration: "none",
    color: "#fff",
    padding: 15,
    display: "block",
    width: "100%",
    textAlign: "center",
    fontWeight: 600
  }
});

const Footer = ({ ...props }) => (
  <footer className={props.classes.footer}>
    <a href="http://localhost:4080" className={props.classes.footerLink}>Кабинет продавца</a>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles, { name: "SkFooter" })(Footer);
