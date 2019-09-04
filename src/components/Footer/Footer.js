import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "../Link";
import Typography from "@material-ui/core/Typography";

const date = new Date();

const styles = (theme) => ({
  footer: {
    position: "absolute",
    textAlign: "center",
    width: "100%",
    bottom: "0"
  },
  link: {
    cursor: "pointer",
    marginLeft: "30px"
  }
});

const Footer = ({ ...props }) => (
  <footer className={props.classes.footer}>
    <Typography variant="caption">
      rosin.store &copy; {date.getFullYear()}{" "}
      <Link className={props.classes.link} href="termsAndConditions">
        Obchodné podmienky
      </Link>
      <Link className={props.classes.link} href="privacyPolicy">
        Ochrana osobných údajov
      </Link>
    </Typography>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles, { name: "SkFooter" })(Footer);
