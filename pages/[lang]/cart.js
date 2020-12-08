import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import CartItems from "components/CartItems";
import CheckoutButtons from "components/CheckoutButtons";
import Link from "components/Link";
import Layout from "components/Layout";
import Router from "translations/i18nRouter";
import PageLoading from "components/PageLoading";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import useTrackerEvents from "hooks/analytics/useTrackerEvents";
import useCart from "hooks/cart/useCart";
import variantById from "lib/utils/variantById";

const useStyles = makeStyles((theme) => ({
  cartEmptyMessageContainer: {
    margin: "80px 0"
  },
  checkoutButtonsContainer: {
    backgroundColor: theme.palette.reaction.black02,
    padding: theme.spacing(2)
  },
  customerSupportCopy: {
    paddingLeft: `${theme.spacing(4)}px !important`
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
}));

const CartPage = (props) => {
  const classes = useStyles();
  const { shop } = props;
  const {
    cart,
    hasMoreCartItems,
    loadMoreCartItems,
    onChangeCartItemsQuantity,
    onRemoveCartItems
  } = useCart();

  const {
    trackCartViewedEvent,
    trackProductRemoveEvent
  } = useTrackerEvents();


  useEffect(() => {
    if (cart?.items && cart?.items?.length) {
      trackCartViewedEvent({
        cartItems: cart.items,
        cartId: cart._id
      });
    }
  }, [cart]);

  const handleClick = () => Router.push("/");

  const handleItemQuantityChange = (quantity, cartItemId) => {
    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  const handleRemoveItem = async (itemId) => {
    // TODO: we track the product basically as we track the cart
    // but we have to get somehow the product and variant data
    const { data, error } = await onRemoveCartItems(itemId);

    if (data && !error && cart?.items && cart?.items?.length) {
      const { cart: { _id } } = data.removeCartItems;
      const removedItem = { cart_id: _id, ...variantById(cart.items, itemId) }; // eslint-disable-line camelcase

      // Track removed item
      trackProductRemoveEvent({
        cartItems: removedItem,
        cartId: cart._id
      });
    }
  };

  const renderCartItems = () => {
    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <Grid item xs={12} md={8}>
          <div className={classes.itemWrapper}>
            <CartItems
              hasMoreCartItems={hasMoreCartItems}
              onLoadMoreCartItems={loadMoreCartItems}
              items={cart.items}
              onChangeCartItemQuantity={handleItemQuantityChange}
              onRemoveItemFromCart={handleRemoveItem}
            />
          </div>
        </Grid>
      );
    }

    return (
      <Grid item xs={12} className={classes.cartEmptyMessageContainer}>
        <CartEmptyMessage onClick={handleClick} />
      </Grid>
    );
  };

  const renderCartSummary = () => {
    if (cart?.checkout?.summary && Array.isArray(cart.items) && cart.items.length) {
      const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = cart.checkout.summary;

      return (
        <Grid item xs={12} md={3}>
          <CartSummary
            displayShipping={fulfillmentTotal?.displayAmount}
            displaySubtotal={itemTotal?.displayAmount}
            displaySurcharge={surchargeTotal?.displayAmount}
            displayTax={taxTotal?.displayAmount}
            displayTotal={total?.displayAmount}
            itemsQuantity={cart?.totalItemQuantity}
          />
          <div className={classes.checkoutButtonsContainer}>
            <CheckoutButtons />
          </div>
        </Grid>
      );
    }

    return null;
  };

  // when a user has no item in cart in a new session, cart is null
  // when the app is still loading, cart is undefined
  if (typeof cart === "undefined") return <PageLoading delay={0} />;

  return (
    <Layout shop={shop}>
      <Helmet
        title={`Cart | ${shop && shop.name}`}
        meta={[{ name: "description", content: shop && shop.description }]}
      />
      <section>
        <Typography className={classes.title} variant="h6" align="center">
          Shopping Cart
        </Typography>
        <Grid container spacing={3}>
          {renderCartItems()}
          {renderCartSummary()}
          <Grid className={classes.customerSupportCopy} item>
            <Typography paragraph variant="caption">
              Have questions? call <span className={classes.phoneNumber}>1.800.555.5555</span>
            </Typography>
            <Typography paragraph variant="caption">
              <Link href="#">Shipping information</Link>
            </Typography>
            <Typography paragraph variant="caption">
              <Link href="#">Return policy</Link>
            </Typography>
          </Grid>
        </Grid>
      </section>
    </Layout>
  );
};


CartPage.propTypes = {
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  })
};


/**
 *  Static props for the cart route
 *
 * @param {String} lang - the shop's language
 * @returns {Object} props
 */
export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"])
    }
  };
}

/**
 *  Static paths for the cart route
 *
 * @returns {Object} paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(CartPage);
