import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { NavigationDesktop } from "components/NavigationDesktop";
import { NavigationMobile, NavigationToggleMobile } from "components/NavigationMobile";
import AccountDropdown from "components/AccountDropdown";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import Link from "components/Link";
import MiniCart from "components/MiniCart";
import * as styles from "./style";
import HamburgerIcon from "../Icons/HamburgerMenu";
import CartIcon from "../Icons/Cart";

// const styles = (theme) => ({
//   appBar: {
//     backgroundColor: theme.palette.reaction.white,
//     borderBottom: `solid 1px ${theme.palette.reaction.black05}`,
//     color: theme.palette.reaction.coolGrey500
//   },
//   controls: {
//     alignItems: "inherit",
//     display: "inherit",
//     flex: 1
//   },
//   title: {
//     color: theme.palette.reaction.reactionBlue,
//     marginRight: theme.spacing.unit,
//     borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
//   },
//   toolbar: {
//     alignItems: "center",
//     display: "flex",
//     justifyContent: "space-between"
//   }
// });

@withStyles(styles, { name: "SkHeader" })
@inject("uiStore")
class Header extends Component {
  static propTypes = {
    shop: PropTypes.shape({
      name: PropTypes.string
    }).isRequired,
    uiStore: PropTypes.shape({
      toggleMenuDrawerOpen: PropTypes.func.isRequired
    }).isRequired,
    viewer: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  handleNavigationToggleClick = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
  };

  render() {
    const {
      classes: { appBar, controls, toolbar, title },
      shop
    } = this.props;

    return (
      <styles.Container>
        <Hidden mdUp>
          <styles.ToggleButton onClick={this.handleNavigationToggleClick}>
            <HamburgerIcon />
          </styles.ToggleButton>
        </Hidden>

        <styles.Logo alt={"Logo"} src={"../../static/images/logo.png"} />
        {/* <CartIcon /> */}
        <MiniCart />
        <NavigationMobile />
      </styles.Container>
      // <AppBar position="static" elevation={0} className={appBar}>
      //   <Toolbar className={toolbar}>
      //     <Hidden mdUp>
      //       <NavigationToggleMobile onClick={this.handleNavigationToggleClick} />
      //     </Hidden>

      //     <div className={controls}>
      //       <Typography className={title} color="inherit" variant="h6">
      //         <Link route="/">
      //           <ShopLogo shopName={shop.name} />
      //         </Link>
      //       </Typography>

      //       <Hidden smDown initialWidth={"md"}>
      //         <NavigationDesktop />
      //       </Hidden>
      //     </div>

      //     <AccountDropdown />
      //     <MiniCart />
      //   </Toolbar>
      //   <NavigationMobile />
      // </AppBar>
    );
  }
}

export default Header;
