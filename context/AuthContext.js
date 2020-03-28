import { createContext, useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { setAccessToken as setApolloToken } from "lib/apollo/apolloClient";

const fetcher = (url) => fetch(url).then((r) => r.json());

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
      sessionStorage.setItem("currentToken", fetchedToken);
      setApolloToken(fetchedToken);
    }
  }, [tokenData]);

  const setAccount = (newAccount) => {
    if (newAccount) {
      setAccountId(newAccount._id) || null;
      _setAccount({ ...splitNames(newAccount), ...newAccount });

      const { name, emailRecords, company, phone } = newAccount;

      if (process.browser && window && typeof window !== "undefined") {
        const { $crisp } = window;

        if ($crisp) {
          // Crisp throws errors e.g. for wrong emails like admin@localhost
          try {
            if (name) {
              $crisp.push(["set", "user:nickname", [name]]);
            }

            if (emailRecords && emailRecords.length) {
              const { address: email } = emailRecords[0];
              $crisp.push(["set", "user:email", [email]]);
            }

            if (company) {
              $crisp.push(["set", "user:company", [company]]);
            }

            if (phone) {
              $crisp.push(["set", "user:phone", [phone]]);
            }
          } catch (error) {
            // This is not critial
            // console.error("Error forwarding user data", error);
          }
        }
      }
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