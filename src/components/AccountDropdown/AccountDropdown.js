import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AccountIcon from "mdi-material-ui/Account";
import Popover from "@material-ui/core/Popover";
import ViewerInfo from "@reactioncommerce/components/ViewerInfo/v1";
import { login } from "lib/auth";

const styles = (theme) => ({
  accountDropdown: {
    width: 320,
    padding: theme.spacing.unit * 2
  },
  authContent: {
    marginBottom: theme.spacing.unit * 2
  }
});

@withStyles(styles, { name: "SkAccountDropdown" })
@inject("authStore")
@observer
class AccountDropdown extends Component {
  static propTypes = {
    authStore: PropTypes.object.isRequired,
    classes: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  static getDerivedStateFromProps(props, state) {
    // Sometimes state comes through null. This might be a NextJS bug or react
    // hot loader bug. For now, this workaround works.
    if (state === null) return null;

    const nextPropsToken = (props.authStore && props.authStore.token) || "";
    if (nextPropsToken !== state.prevToken) {
      // prevToken is changed only here and stored for next comparison, whereas
      // token is changed as the user types
      return { prevToken: nextPropsToken, token: nextPropsToken };
    }

    return null;
  }

  state = {
    anchorElement: null
  };

  toggleOpen = (event) => {
    this.setState({ anchorElement: event.currentTarget });
  }

  onClose = () => {
    this.setState({ anchorElement: null });
  }

  onTokenChange = (event) => {
    this.setState({ token: event.target.value || "" });
  }

  onTokenSave = () => {
    const { authStore } = this.props;

    authStore.setToken(this.state.token);

    // Reload so the auth changes can be reflected on server and in browser
    window.location.reload();
  }

  onLogin = () => {
    login();
  }

  onLogout = () => {
    window.location.reload();
  }

  render() {
    const { classes, authStore } = this.props;
    const { anchorElement } = this.state;

    return (
      <Fragment>
        <IconButton color="inherit" onClick={this.toggleOpen}>
          <AccountIcon />
        </IconButton>

        <Popover
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={Boolean(anchorElement)}
          onClose={this.onClose}
        >
          <div className={classes.accountDropdown}>
            {authStore.isAuthenticated ?
              <Fragment>
                <div className={classes.authContent}>
                  <ViewerInfo
                    viewer={{
                      firstName: authStore.account.name,
                      lastName: " "
                    }}
                  />
                </div>
                <Button color="primary" fullWidth href="/logout" variant="raised">
                  Sign Out
                </Button>
              </Fragment>
              :
              <Fragment>
                <div className={classes.authContent}>
                  <Button color="primary" fullWidth href="/auth2" variant="raised">
                    Sign In
                  </Button>
                </div>
                <Button color="primary" fullWidth href="/auth2">
                  Create Account
                </Button>
              </Fragment>
            }
          </div>
        </Popover>
      </Fragment>
    );
  }
}

export default AccountDropdown;
