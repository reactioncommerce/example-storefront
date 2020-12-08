import { useAnalytics } from "use-analytics";
import { useRouter } from "next/router";
import TRACKING from "lib/tracking/constants";
import trackProduct from "lib/tracking/trackProduct";
import trackCartItems from "lib/tracking/trackCartItems";
import trackCheckout from "lib/tracking/trackCheckout";
import trackCheckoutStep from "lib/tracking/trackCheckoutStep";
import trackOrder from "lib/tracking/trackOrder";
import trackProductListViewed from "lib/tracking/trackProductListViewed";

const {
  PRODUCT_VIEWED,
  PRODUCT_ADDED,
  PRODUCT_REMOVED,
  CART_VIEWED,
  CHECKOUT_STARTED,
  CHECKOUT_STEP_VIEWED,
  CHECKOUT_STEP_COMPLETED,
  ORDER_COMPLETED,
  PAYMENT_INFO_ENTERED,
  PRODUCT_CLICKED,
  PRODUCT_LIST_VIEWED
} = TRACKING;

/**
 * track events to different providers
 * @returns {Object} useTrackerEvents
 */
export default function useTrackerEvents() {
  const { track } = useAnalytics();
  const { asPath: url, query } = useRouter();

  // https://segment.com/docs/connections/spec/ecommerce/v2/#product-viewed
  const trackProductViewedEvent = (payload) => {
    const data = trackProduct(payload);
    track(PRODUCT_VIEWED, data);
  };

  // TODO: add coupon code
  // https://segment.com/docs/connections/spec/ecommerce/v2/#product-added
  const trackProductAddedEvent = (payload) => {
    const data = trackProduct(payload);
    track(PRODUCT_ADDED, data);
  };

  // TODO: we need the variant and product data to track this properly
  // https://segment.com/docs/connections/spec/ecommerce/v2/#product-removed
  const trackProductRemoveEvent = (payload) => {
    const data = trackCartItems({ ...payload, url, locale: query.lang });
    track(PRODUCT_REMOVED, data);
  };

  // TODO: add url variant and url_media variant
  // https://segment.com/docs/connections/spec/ecommerce/v2/#cart-viewed
  const trackCartViewedEvent = (payload) => {
    const data = trackCartItems({ ...payload, url, locale: query.lang });
    track(CART_VIEWED, data);
  };

  // TODO: add url variant and url_media variant
  // TODO: add discount
  // https://segment.com/docs/connections/spec/ecommerce/v2/#checkout-started
  const trackCheckoutStartedEvent = (payload) => {
    const data = trackCheckout({ ...payload, url, locale: query.lang });
    track(CHECKOUT_STARTED, data);
  };

  // https://segment.com/docs/connections/spec/ecommerce/v2/#checkout-step-viewed
  const trackCheckoutStepViewed = (payload) => {
    const data = trackCheckoutStep(payload);
    track(CHECKOUT_STEP_VIEWED, data);
  };

  // https://segment.com/docs/connections/spec/ecommerce/v2/#checkout-step-completed
  const trackCheckoutStepCompleted = (payload) => {
    const data = trackCheckoutStep(payload);
    track(CHECKOUT_STEP_COMPLETED, data);
  };

  // https://segment.com/docs/connections/spec/ecommerce/v2/#payment-info-entered
  const trackPaymentInfoEntered = (payload) => {
    const data = trackCheckoutStep(payload);
    track(PAYMENT_INFO_ENTERED, data);
  };

  // https://segment.com/docs/connections/spec/ecommerce/v2/#order-completed
  const trackOrderCompleted = (payload) => {
    const data = trackOrder({ ...payload, locale: query.lang });
    track(ORDER_COMPLETED, data);
  };

  // https://segment.com/docs/connections/spec/ecommerce/v2/#product-clicked
  const trackProductClickedEvent = (payload) => {
    const data = trackProductClicked(payload);
    track(PRODUCT_CLICKED, data);
  };

  // https://segment.com/docs/connections/spec/ecommerce/v2/#product-list-viewed
  const trackProductListedEvent = (payload) => {
    const data = trackProductListViewed(payload);
    track(PRODUCT_LIST_VIEWED, data);
  };

  return {
    trackProductViewedEvent,
    trackProductAddedEvent,
    trackProductRemoveEvent,
    trackCartViewedEvent,
    trackCheckoutStartedEvent,
    trackCheckoutStepViewed,
    trackCheckoutStepCompleted,
    trackOrderCompleted,
    trackPaymentInfoEntered,
    trackProductClickedEvent,
    trackProductListedEvent
  };
}
