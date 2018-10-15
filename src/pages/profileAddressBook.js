import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import Profile from "components/Profile";
import CheckoutButtons from "components/CheckoutButtons";
import Link from "components/Link";
import { Router } from "routes";

const styles = (theme) => ({
  cartEmptyMessageContainer: {
    margin: "80px 0"
  },
  checkoutButtonsContainer: {
    backgroundColor: theme.palette.reaction.black02,
    padding: theme.spacing.unit * 2
  },
  customerSupportCopy: {
    paddingLeft: `${theme.spacing.unit * 4}px !important`
  },
  phoneNumber: {
    fontWeight: theme.typography.fontWeightBold
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: "1.6rem",
    marginBottom: "3.1rem"
  },
  itemWrapper: {
    borderTop: theme.palette.borders.default,
    borderBottom: theme.palette.borders.default
  }
});

@withStyles(styles)
@inject("authStore")
@inject("uiStore")
@observer
class ProfileAddressBook extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      totalItems: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        fulfillmentTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  renderMainArea() {
    const { authStore: { account} } = this.props;

    // if (isLoadingProduct) return <PageLoading />;

    if (!account) return <ErrorPage shop={shop} subtitle="Not Found" />;

    const viewer = {
      firstName: "John",
      lastName: "Doe",
      name: "John Doe",
      primaryEmailAddress: "john@doe.com",
      profileImage: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y"
    };

    return (
      <section>
        <Grid container spacing={24}>
          <Grid item xs={12} md={3}>
            <AccountProfileInfo viewer={account} />
            <InPageMenu menuItems={menuItems} />
          </Grid>
          <Grid item xs={12} md={9}>
            <AddressBook account={accountAddressBook} />
          </Grid>
        </Grid>
      </section>
    );
  }


  render() {
    const { classes, shop } = this.props;

    return (
      <Fragment>
        {this.renderMainArea()}
      </Fragment>
    );
  }
}

export default ProfileAddressBook;
