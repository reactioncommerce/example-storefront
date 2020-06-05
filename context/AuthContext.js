import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { setAccessToken as setApolloToken } from "lib/apollo/apolloClient";

const fetcher = (url) => fetch(url).then((response) => response.json());

/**
 * Splits the user's full name into first and last name
 *
 * @param {Object} account - the users account
 * @returns {Object} users first and last name as object properties
 */
function splitNames(account) {
  let firstName = "";
  let lastName = "";
  const { name } = account;
  const nameParts = name && name.split(" ");
  if (Array.isArray(nameParts)) {
    [firstName, lastName] = nameParts;
  }

  return {
    firstName,
    lastName
  };
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accountId, setAccountId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [account, _setAccount] = useState({});

  const { data: tokenData } = useSWR("/api/account/token", fetcher);

  useEffect(() => {
    const fetchedToken = tokenData && tokenData.accessToken;
    if (fetchedToken) {
      setAccessToken(fetchedToken);
      setApolloToken(fetchedToken);
    }
  }, [tokenData]);

  const setAccount = (newAccount) => {
    if (newAccount) {
      setAccountId(newAccount._id) || null;
      _setAccount({ ...splitNames(newAccount), ...newAccount });
    } else {
      setAccountId(null);
      _setAccount({});
    }
  };

  return (
    <AuthContext.Provider value={{
      accountId,
      account,
      accessToken,
      setAccount,
      setAccessToken,
      isAuthenticated: !!accountId
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
