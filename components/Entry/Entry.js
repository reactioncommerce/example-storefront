import React from "react";
import PropTypes from "prop-types";
import Router from "translations/i18nRouter";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GuestForm from "@reactioncommerce/components/GuestForm/v1";
import Button from "@reactioncommerce/components/Button/v1";

// flex wrapper jss mixin
const flexWrapper = () => ({
  alignItems: "stretch",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
});

const styles = (theme) => ({
  loginWrapper: {
    ...flexWrapper(),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      minHeight: "400px",
      paddingBottom: 0,
      paddingRight: theme.spacing(8)
    }
  },
  loginButton: {
    marginTop: theme.spacing(3)
  },
  guestWrapper: {
    ...flexWrapper(),
    borderTop: `solid 1px ${theme.palette.reaction.black10}`,
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      borderLeft: `solid 1px ${theme.palette.reaction.black10}`,
      borderTop: "none",
      paddingLeft: theme.spacing(8),
      paddingTop: 0
    }
  }
});

const Entry = (props) => {
  const { classes, onLoginButtonClick, onRegisterButtonClick, setEmailOnAnonymousCart } = props;
  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <div className={classes.loginWrapper}>
          <Typography variant="h6" gutterBottom>
            Returning Customer
          </Typography>
          <Button onClick={onLoginButtonClick} actionType="important" isFullWidth className={classes.loginButton}>
            Login
          </Button>
          <Button onClick={onRegisterButtonClick} actionType="secondary" isFullWidth className={classes.loginButton}>
            Create a new accounts
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} md={5}>
        <div className={classes.guestWrapper}>
          <Typography variant="h6" gutterBottom>
            Guest Checkout
          </Typography>
          <GuestForm onSubmit={setEmailOnAnonymousCart} />
        </div>
      </Grid>
    </Grid>
  );
};

Entry.defaultProps = {
  onLoginButtonClick() {
    Router.push("/signin");
  },
  onRegisterButtonClick() {
    Router.push("/signup");
  },
  setEmailOnAnonymousCart() {}
};

Entry.propTypes = {
  classes: PropTypes.object,
  onLoginButtonClick: PropTypes.func,
  onRegisterButtonClick: PropTypes.func,
  setEmailOnAnonymousCart: PropTypes.func,
  theme: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Entry);
