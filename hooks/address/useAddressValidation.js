import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import useShop from "hooks/shop/useShop";
import { validateAddressQuery } from "./query.gql";

/**
 * Perform address validation
 *
 * @returns {Array} A list of suggested addresses
 */
export default function useAddressValidation() {
  const shop = useShop();

  let isMounted = false;

  const [submittedAddress, setSubmittedAddress] = useState(null);
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  const xformValidSuggestions = (address) => ({
    ...address,
    isValid: true
  });

  const [handleAddressValidationFunc, { data }] = useLazyQuery(validateAddressQuery);

  const handleAddressValidation = async (address) => {
    if (!address) return;

    await handleAddressValidationFunc({
      variables: {
        address,
        shopId: shop && shop._id
      }
    });

    if (isMounted) {
      setSubmittedAddress(address);
      setValidationErrors(data ? data.validationErrors : []);
      setSuggestedAddresses(data ? data.suggestedAddresses.map(xformValidSuggestions) : []);
    }
  };

  const addressValidationResults = {
    submittedAddress,
    suggestedAddresses,
    validationErrors
  };

  return [
    handleAddressValidation,
    addressValidationResults
  ];
}
