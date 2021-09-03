import React, { useState, Fragment, useEffect } from "react";
import inject from "hocs/inject";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import AccountIcon from "mdi-material-ui/Account";
import Popover from "@material-ui/core/Popover";
import useViewer from "hooks/viewer/useViewer";
import ViewerInfo from "@reactioncommerce/components/ViewerInfo/v1";
import Link from "components/Link";
import useStores from "hooks/useStores";
import EntryModal from "../Entry/EntryModal";
import getAccountsHandler from "../../lib/accountsServer.js";

const useStyles = makeStyles((theme) => ({
  accountDropdown: {
    width: 320,
    padding: theme.spacing(2)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
}));

const AccountDropdown = () => {
  const router = useRouter();
  const { uiStore } = useStores();
  const { setEntryModal } = uiStore;
  const resetToken = router?.query?.resetToken;
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [viewer, , refetch] = useViewer();
  const { accountsClient } = getAccountsHandler();
  const isAuthenticated = viewer && viewer._id;

  useEffect(() => {
    // Open the modal in case of reset-password link
    if (!resetToken) {
      return;
    }
    setEntryModal("reset-password");
  }, [resetToken]);

  const onClose = () => {
    setAnchorElement(null);
  };

  const handleSignOut = async () => {
    await accountsClient.logout();
    await refetch();
    onClose();
  };

  const toggleOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  return (
    <Fragment>
      <EntryModal onClose={onClose} resetToken={resetToken} />
      {isAuthenticated ? (
        <ButtonBase onClick={toggleOpen}>
          <ViewerInfo viewer={viewer} />
        </ButtonBase>
      ) : (
        <IconButton color="inherit" onClick={toggleOpen}>
          <AccountIcon />
        </IconButton>
      )}

      <Popover
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={Boolean(anchorElement)}
        onClose={onClose}
      >
        <div className={classes.accountDropdown}>
          {isAuthenticated ? (
            <Fragment>
              <div className={classes.marginBottom}>
                <Link href="/profile/address">
                  <Button color="primary" fullWidth>
                    Profile
                  </Button>
                </Link>
              </div>
              <div className={classes.marginBottom}>
                <Button color="primary" fullWidth onClick={() => setEntryModal("change-password")}>
                  Change Password
                </Button>
              </div>
              <Button color="primary" fullWidth onClick={handleSignOut} variant="contained">
                Sign Out
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.authContent}>
                <Button color="primary" fullWidth variant="contained" onClick={() => setEntryModal("login")}>
                  Sign In
                </Button>
              </div>
              <Button color="primary" fullWidth onClick={() => setEntryModal("signup")}>
                Create Account
              </Button>
            </Fragment>
          )}
        </div>
      </Popover>
    </Fragment>
  );
};

export default inject("authStore")(AccountDropdown);
