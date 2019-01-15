import Layout from "components/Layout";
import { StripeProvider } from "react-stripe-elements";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

/**
 *
 */
export function withLayout(pageElement, { route, shop, viewer }) {
  if (route === "/checkout" || route === "/login") {
    const { stripePublicApiKey } = publicRuntimeConfig;
    let stripe = null;
    if (stripePublicApiKey && window.Stripe) {
      stripe = window.Stripe(stripePublicApiKey);
    }

    return (
      <StripeProvider stripe={stripe}>
        {pageElement}
      </StripeProvider>
    );
  }

  return (
    <Layout shop={shop} viewer={viewer}>
      {pageElement}
    </Layout>
  );
}
