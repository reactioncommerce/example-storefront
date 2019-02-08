import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import InPageMenu from "@reactioncommerce/components/InPageMenu/v1";
import ProfileAddressBook from "components/ProfileAddressBook";
import withAddressBook from "containers/address/withAddressBook";
import ErrorPage from "./_error";

const styles = (theme) => ({
  accountProfileInfoContainer: {
    marginBottom: theme.spacing.unit * 4
  }
});

@withStyles(styles)
@withAddressBook
@inject("authStore")
@inject("uiStore")
@observer
class Profile extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    onAddressAdded: PropTypes.func.isRequired,
    onAddressDeleted: PropTypes.func.isRequired,
    onAddressEdited: PropTypes.func.isRequired,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  renderMainContent() {
    const { router: { asPath }, shop } = this.props;

    if (asPath === "/profile/address") {
      return <ProfileAddressBook />;
    }

    if (asPath === "/profile/orders") {
      return "Orders placeholder";
    }

    if (asPath === "/profile/payments") {
      return "Payment Methods placeholder";
    }

    return <ErrorPage shop={shop} subtitle="Not Found" />;
  }

  renderAccountProfileInfo() {
    const { authStore: { account }, classes } = this.props;

    return (
      <div className={classes.accountProfileInfoContainer}>
        <AccountProfileInfo viewer={account} />
      </div>
    );
  }

  renderNavigation() {
    const { classes, router: { asPath } } = this.props;

    const menuItems = [
      {
        href: "/profile/address",
        route: "/profile/address",
        label: "Address Book",
        isSelected: asPath === "/profile/address"
      }
      // {
      //   href: "/profile/orders",
      //   route: "/profile/orders",
      //   label: "Orders",
      //   isSelected: asPath === "/profile/orders"
      // },
      // {
      //   href: "/profile/payments",
      //   route: "/profile/payments",
      //   label: "Payment Methods",
      //   isSelected: asPath === "/profile/payments"
      // }
    ];

    return (
      <div className={classes.inPageMenuItemLink}>
        <InPageMenu menuItems={menuItems} />
      </div>
    );
  }

  render() {
    const { authStore: { account }, shop } = this.props;

    // If there is no logged in user, return Not Found page
    if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <Fragment>
        <Helmet
          title={`Account Profile | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section>
          <Grid container spacing={24}>
            <Grid item xs={0} md={1} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
            <Grid item xs={12} md={3}>
              {this.renderAccountProfileInfo()}
              {this.renderNavigation()}
            </Grid>
            <Grid item xs={12} md={7}>
              {this.renderMainContent()}
            </Grid>
            <Grid item xs={0} md={1} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
          </Grid>
        </section>
      </Fragment>
    );
  }
}

export default Profile;
