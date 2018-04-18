import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { action, computed, observable } from "mobx";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import DialogActions from "material-ui/Dialog/DialogActions";
import Button from "material-ui/Button";
import AccountIcon from "mdi-material-ui/Account";
import Popover from "material-ui/Popover";

const styles = (theme) => ({
  accountDropdown: {
    width: 320,
    padding: theme.spacing.unit * 2
  }
});

@withStyles(styles)
@inject("authStore")
@observer
class AccountDropdown extends Component {
  static propTypes = {
    authStore: PropTypes.object,
    classes: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    uiStore: {}
  };

  @observable _anchorEl = null

  @computed get anchorEl() { return this._anchorEl; }
  set anchorEl(value) { this._anchorEl = value; }

  @action toggleOpen = (event) => {
    this.anchorEl = event.currentTarget;
  }

  @action onClose = () => {
    this.anchorEl = null;
  }

  @action onTokenChange = (event) => {
    const { authStore } = this.props;

    authStore.token = event.target.value;
  }

  render() {
    const { authStore, classes } = this.props;
    return (
      <Fragment>
        <IconButton color="inherit" onClick={this.toggleOpen}>
          <AccountIcon />
        </IconButton>

        <Popover
          anchorEl={this.anchorEl}
          anchorOrigin={{
            vertical: "bottom"
          }}
          open={Boolean(this.anchorEl)}
          onClose={this.onClose}
        >
          <div className={classes.accountDropdown}>
            <TextField
              fullWidth={true}
              label="Login Token"
              onChange={this.onTokenChange}
              value={authStore.token}
            />

            <DialogActions>
              <Button>
                {"Cancel"}
              </Button>
              <Button color="primary" onClick={authStore.saveToken}>
                {"Save"}
              </Button>
            </DialogActions>
          </div>
        </Popover>
      </Fragment>
    );
  }
}

export default AccountDropdown;
