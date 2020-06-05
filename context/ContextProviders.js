import React from "react";
import PropTypes from "prop-types";
import { RoutingProvider } from "context/RoutingContext";
import { AuthProvider } from "context/AuthContext";
import { CartProvider } from "context/CartContext";
import { ShopProvider } from "context/ShopContext";
import { TagsProvider } from "context/TagsContext";
import { UIProvider } from "context/UIContext";
import { LocaleProvider } from "context/LocaleContext";

export const ContextProviders = ({ children, pageProps }) => {
  const { tags, shop, lang, translations, namespaces } = pageProps;

  return (
    <RoutingProvider>
      <UIProvider>
        <AuthProvider>
          <CartProvider>
            <LocaleProvider
              lang={lang}
              translations={translations}
              namespaces={namespaces}
            >
              <ShopProvider shop={shop}>
                <TagsProvider tags={tags}>
                  {children}
                </TagsProvider>
              </ShopProvider>
            </LocaleProvider>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </RoutingProvider>
  );
};

ContextProviders.propTypes = {
  children: PropTypes.node,
  pageProps: PropTypes.object
};
