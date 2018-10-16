import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import AddressBook from "@reactioncommerce/components/AddressBook/v1";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import InPageMenu from "@reactioncommerce/components/InPageMenuItem/v1";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import ErrorPage from "./_error";

const styles = (theme) => ({
  accountProfileInfoContainer: {
    marginBottom: theme.spacing.unit * 4
  }
});

@withStyles(styles)
@inject("authStore")
@inject("uiStore")
@observer
class ProfileAddressBook extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  renderAddressBook() {
    const { authStore: { account } } = this.props;

    // Use relayConnectionToArray to remove edges / nodes levels from addressBook object
    const addresses = account.addressBook && account.addressBook.length ? relayConnectionToArray(account.addressBook) : [];
    console.log("addresses after relayConnectionToArray()", addresses);

    // Create data object to pass to AddressBook component
    const accountAddressBook = {
      addressBook: addresses
    };
    console.log("accountAddressBook", accountAddressBook);

    return (
      <AddressBook account={accountAddressBook} />
    );
  }

  renderOrders() {
    return "This is where the orders screen will go";
  }




  renderMainContent() {
    const { router: { asPath } } = this.props;

    if (asPath === "/profile/address") {
      return this.renderAddressBook();
    }

    if (asPath === "/profile/orders") {
      return "Orders placeholder";
    }

    return "Hello";
  }

  renderNavigation() {
    const { router: { asPath } } = this.props;

    const menuItems = [
      {
        href: "/profile/address",
        label: "Address Book",
        isSelected: asPath === "/profile/address"
      },
      {
        href: "/profile/orders",
        label: "Orders",
        isSelected: asPath === "/profile/orders"
      }
    ];

    return (
      <InPageMenu menuItems={menuItems} />
    );
  }

  render() {
    const { authStore: { account }, shop } = this.props;

    // If there is no logged in user, return Not Found page
    if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <section>
        <Grid container spacing={24}>
          <Grid item xs={12} md={3}>
            <AccountProfileInfo viewer={account} />
            {this.renderNavigation()}
          </Grid>
          <Grid item xs={12} md={9}>
            {this.renderMainContent()}
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default ProfileAddressBook;
