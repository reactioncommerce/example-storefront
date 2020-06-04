import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddressBook from "@reactioncommerce/components/AddressBook/v1";
import withAddressBook from "containers/address/withAddressBook";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import ErrorPage from "../../pages/_error";

const styles = (theme) => ({
  profileAddressBookTitle: {
    marginBottom: theme.spacing(4)
  }
});

class ProfileAddressBook extends Component {
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

  renderAddressBook() {
    const {
      authStore: { account: { addressBook } },
      onAddressAdded,
      onAddressEdited,
      onAddressDeleted
    } = this.props;
    // Use relayConnectionToArray to remove edges / nodes levels from addressBook object
    const addresses = (addressBook && relayConnectionToArray(addressBook)) || [];

    // Create data object to pass to AddressBook component
    const accountAddressBook = {
      addressBook: addresses
    };

    return (
      <AddressBook
        account={accountAddressBook}
        onAddressAdded={onAddressAdded}
        onAddressEdited={onAddressEdited}
        onAddressDeleted={onAddressDeleted}
      />
    );
  }

  render() {
    const { authStore: { account }, classes, shop } = this.props;

    if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <Grid className={classes.profileAddressBookContainer} container>
        <Grid className={classes.profileAddressBookTitle} item xs={12} md={12}>
          <Typography variant="h6">Address Book</Typography>
        </Grid>
        {this.renderAddressBook()}
      </Grid>
    );
  }
}

export default withStyles(styles)(withAddressBook(inject("authStore", "uiStore")(ProfileAddressBook)));
