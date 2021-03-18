import React from "react";
import inject from "hocs/inject";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { NavigationDesktop } from "components/NavigationDesktop";
import {
  NavigationMobile,
  NavigationToggleMobile,
} from "components/NavigationMobile";
import LocaleDropdown from "components/LocaleDropdown";
import AccountDropdown from "components/AccountDropdown";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import Link from "components/Link";
import MiniCart from "components/MiniCart";

import type { FC } from "react";
import type { WithStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.reaction.white,
      borderBottom: `solid 1px ${theme.palette.reaction.black05}`,
      color: theme.palette.reaction.coolGrey500,
    },
    controls: {
      alignItems: "inherit",
      display: "inherit",
      flex: 1,
    },
    title: {
      color: theme.palette.reaction.reactionBlue,
      marginRight: theme.spacing(),
      borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`,
    },
    toolbar: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
    },
  });

interface HeaderProps extends WithStyles<typeof styles> {
  shop: {
    name: string;
  };
  uiStore: {
    toggleMenuDrawerOpen: Function;
  };
  viewer: any;
}

const Header: FC<HeaderProps> = ({ classes, shop, uiStore }) => {
  const handleNavigationToggleClick = () => {
    uiStore.toggleMenuDrawerOpen();
  };
  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <NavigationToggleMobile onClick={handleNavigationToggleClick} />
        </Hidden>

        <div className={classes.controls}>
          <Typography className={classes.title} color="inherit" variant="h6">
            {/* @ts-ignore TODO: Refactor link to address type error */}
            <Link route="/">
              {shop ? <ShopLogo shopName={shop.name} /> : "Example Storefront"}
            </Link>
          </Typography>

          <Hidden smDown initialWidth={"md"}>
            <NavigationDesktop />
          </Hidden>
        </div>

        <LocaleDropdown />

        <AccountDropdown />
        <MiniCart />
      </Toolbar>
      <NavigationMobile shop={shop} />
    </AppBar>
  );
};

export default withStyles(styles)(inject("uiStore")(Header));
