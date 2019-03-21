import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ProfileAddressBook from "components/ProfileAddressBook";
import ProfileMenu from "components/ProfileMenu";
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
class ProfileAddressBookPage extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    onAddressAdded: PropTypes.func.isRequired,
    onAddressDeleted: PropTypes.func.isRequired,
    onAddressEdited: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  renderMainContent() {
    return <ProfileAddressBook />;
  }

  render() {
    const { authStore: { account }, router, shop } = this.props;

    // If there is no logged in user, return Not Found page
    if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <Fragment>
        <Helmet
          title={`My Address Book | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section>
          <Grid container spacing={24}>
            <Grid item xs={false} md={1} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
            <Grid item xs={12} md={3}>
              <ProfileMenu router={router} />
            </Grid>
            <Grid item xs={12} md={7}>
              {this.renderMainContent()}
            </Grid>
            <Grid item xs={false} md={1} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
          </Grid>
        </section>
      </Fragment>
    );
  }
}

export default ProfileAddressBookPage;
