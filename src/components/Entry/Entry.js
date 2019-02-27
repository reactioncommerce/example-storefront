import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";
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
    paddingBottom: theme.spacing.unit * 8,
    [theme.breakpoints.up("md")]: {
      minHeight: "400px",
      paddingBottom: 0,
      paddingRight: theme.spacing.unit * 8
    }
  },
  loginButton: {
    marginTop: theme.spacing.unit * 3
  },
  guestWrapper: {
    ...flexWrapper(),
    borderTop: `solid 1px ${theme.palette.reaction.black10}`,
    paddingTop: theme.spacing.unit * 8,
    [theme.breakpoints.up("md")]: {
      borderLeft: `solid 1px ${theme.palette.reaction.black10}`,
      borderTop: "none",
      paddingLeft: theme.spacing.unit * 8,
      paddingTop: 0
    }
  }
});

@withStyles(styles, { withTheme: true, name: "SkEntry" })
export default class Entry extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onLoginButtonClick: PropTypes.func,
    onRegisterButtonClick: PropTypes.func,
    setEmailOnAnonymousCart: PropTypes.func,
    theme: PropTypes.object
  };

  static defaultProps = {
    onLoginButtonClick() {
      Router.pushRoute("/signin");
    },
    onRegisterButtonClick() {
      Router.pushRoute("/signup");
    },
    setEmailOnAnonymousCart() {}
  };

  render() {
    const { classes, onLoginButtonClick, onRegisterButtonClick, setEmailOnAnonymousCart } = this.props;
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
              Create a new account
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
  }
}
