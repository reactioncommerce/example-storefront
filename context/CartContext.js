import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const ANONYMOUS_CART_ID_KEY_NAME = "anonymousCartId";
const ANONYMOUS_CART_TOKEN_KEY_NAME = "anonymousCartToken";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [anonymousCartId, setAnonymousCartId] = useState();
  const [anonymousCartToken, setAnonymousCartToken] = useState();
  const [accountCartId, setAccountCartId] = useState();
  const [isReconcilingCarts, setIsReconcilingCarts] = useState(false);
  const [checkoutPayments, setCheckoutPayments] = useState([]);

  const setAnonymousCartCredentials = (newAnonymousCartId, newAnonymousCartToken) => {
    setAnonymousCartId(newAnonymousCartId || null);
    setAnonymousCartToken(newAnonymousCartToken || null);

    if (typeof newAnonymousCartId === "string" && newAnonymousCartId.length) {
      // Save to local storage
      localStorage.setItem(ANONYMOUS_CART_ID_KEY_NAME, newAnonymousCartId);
      localStorage.setItem(ANONYMOUS_CART_TOKEN_KEY_NAME, newAnonymousCartToken);

      // Save cookies
      Cookies.set(ANONYMOUS_CART_ID_KEY_NAME, newAnonymousCartId);
      Cookies.set(ANONYMOUS_CART_TOKEN_KEY_NAME, newAnonymousCartToken);
    } else {
      // Remove from local storage
      localStorage.removeItem(ANONYMOUS_CART_ID_KEY_NAME);
      localStorage.removeItem(ANONYMOUS_CART_TOKEN_KEY_NAME);

      // Remove cookies
      Cookies.remove(ANONYMOUS_CART_ID_KEY_NAME);
      Cookies.remove(ANONYMOUS_CART_TOKEN_KEY_NAME);
    }
  };

  const clearAnonymousCartCredentials = () => {
    setAnonymousCartCredentials(null, null);
  };

  const setAnonymousCartCredentialsFromLocalStorage = () => {
    const anonymousCartId = localStorage.getItem(ANONYMOUS_CART_ID_KEY_NAME); // eslint-disable-line no-shadow
    const anonymousCartToken = localStorage.getItem(ANONYMOUS_CART_TOKEN_KEY_NAME); // eslint-disable-line no-shadow

    setAnonymousCartCredentials(anonymousCartId, anonymousCartToken);
  };

  useEffect(() => {
    setAnonymousCartCredentialsFromLocalStorage();
  }, []);

  const addCheckoutPayment = (value) => {
    setCheckoutPayments([...checkoutPayments, value]);
  };

  const setCheckoutPayment = (value) => {
    setCheckoutPayments([value]);
  };

  const resetCheckoutPayments = () => {
    setCheckoutPayments([]);
  };

  return (
    <CartContext.Provider value={{
      anonymousCartId,
      anonymousCartToken,
      accountCartId,
      isReconcilingCarts,
      checkoutPayments,
      setAnonymousCartCredentials,
      clearAnonymousCartCredentials,
      setAnonymousCartCredentialsFromLocalStorage,
      setIsReconcilingCarts,
      hasAnonymousCartCredentials: (anonymousCartId && anonymousCartToken) || false,
      hasAccountCart: typeof accountCartId === "string",
      setAccountCartId,
      addCheckoutPayment,
      setCheckoutPayment,
      resetCheckoutPayments
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node
};
