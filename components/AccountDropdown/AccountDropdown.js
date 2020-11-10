import React, { useState, Fragment } from "react";
import inject from "hocs/inject";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import AccountIcon from "mdi-material-ui/Account";
import Popover from "@material-ui/core/Popover";
import useViewer from "hooks/viewer/useViewer";
import ViewerInfo from "@reactioncommerce/components/ViewerInfo/v1";
import Link from "components/Link";
import useTranslation from "hooks/useTranslation";

const useStyles = makeStyles((theme) => ({
  accountDropdown: {
    width: 320,
    padding: theme.spacing(2)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  minIcon: {
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '20px',
    },
  },
  mobilePadding: {
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  }
}));

const AccountDropdown = () => {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [viewer] = useViewer();
  const isAuthenticated = viewer && viewer._id;
  const { t } = useTranslation("common");

  const toggleOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const onClose = () => {
    setAnchorElement(null);
  };

  return (
    <Fragment>
      { isAuthenticated ?
        <ButtonBase onClick={toggleOpen}>
          <ViewerInfo viewer={viewer} />
        </ButtonBase>
        :
        <IconButton className={classes.mobilePadding} color="inherit" onClick={toggleOpen}>
          <AccountIcon className={classes.minIcon} />
        </IconButton>
      }

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
          {isAuthenticated ?
            <Fragment>
              <div className={classes.marginBottom}>
                <Link href="/profile/address">
                  <Button color="primary" fullWidth>
                    {t("profile")}
                  </Button>
                </Link>
              </div>
              <div className={classes.marginBottom}>
                <Button color="primary" fullWidth href={`/change-password?email=${encodeURIComponent(viewer.emailRecords[0].address)}`}>
                  {t("changePassword")}
                </Button>
              </div>
              <Button color="primary" fullWidth href="/logout" variant="contained">
                {t("signOut")}
              </Button>
            </Fragment>
            :
            <Fragment>
              <div className={classes.authContent}>
                <Button color="primary" fullWidth href="/signin" variant="contained">
                  {t("signIn")}
                </Button>
              </div>
              <Button color="primary" fullWidth href="/signup">
                {t("createAccount")}
              </Button>
            </Fragment>
          }
        </div>
      </Popover>
    </Fragment>
  );
};

export default inject("authStore")(AccountDropdown);
