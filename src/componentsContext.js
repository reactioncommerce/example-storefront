import React from "react";
import styled from "styled-components";
import AddressForm from "@reactioncommerce/components/AddressForm/v1";
import Button from "@reactioncommerce/components/Button/v1";
import CartItem from "@reactioncommerce/components/CartItem/v1";
import CartItemDetail from "@reactioncommerce/components/CartItemDetail/v1";
import CartItems from "@reactioncommerce/components/CartItems/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import Checkbox from "@reactioncommerce/components/Checkbox/v1";
import CheckoutAction from "@reactioncommerce/components/CheckoutAction/v1";
import CheckoutActionComplete from "@reactioncommerce/components/CheckoutActionComplete/v1";
import CheckoutActionIncomplete from "@reactioncommerce/components/CheckoutActionIncomplete/v1";
import ErrorsBlock from "@reactioncommerce/components/ErrorsBlock/v1";
import Field from "@reactioncommerce/components/Field/v1";
import MiniCartSummary from "@reactioncommerce/components/MiniCartSummary/v1";
import PhoneNumberInput from "@reactioncommerce/components/PhoneNumberInput/v1";
import Price from "@reactioncommerce/components/Price/v1";
import QuantityInput from "@reactioncommerce/components/QuantityInput/v1";
import Select from "@reactioncommerce/components/Select/v1";
import SelectableItem from "@reactioncommerce/components/SelectableItem/v1";
import SelectableList from "@reactioncommerce/components/SelectableList/v1";
import StockWarning from "@reactioncommerce/components/StockWarning/v1";
import StripeForm from "@reactioncommerce/components/StripeForm/v1";
import spinner from "@reactioncommerce/components/svg/spinner";
import TextInput from "@reactioncommerce/components/TextInput/v1";

const FontIcon = styled.i`
  font-size: 1em;
  vertical-align: middle;
`;

const iconClear = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    style={{ height: "100%", maxHeight: "100%", verticalAlign: "middle" }}
  >
    <path d="M9.926 9.105l-2.105-2.105 2.105-2.105-0.82-0.82-2.105 2.105-2.105-2.105-0.82 0.82 2.105 2.105-2.105 2.105 0.82 0.82 2.105-2.105 2.105 2.105zM7 1.176c3.227 0 5.824 2.598 5.824 5.824s-2.598 5.824-5.824 5.824-5.824-2.598-5.824-5.824 2.598-5.824 5.824-5.824z" />
  </svg>
);

export default {
  AddressForm,
  Button,
  CartItem,
  CartItemDetail,
  CartItems,
  CartSummary,
  Checkbox,
  CheckoutAction,
  CheckoutActionComplete,
  CheckoutActionIncomplete,
  ErrorsBlock,
  Field,
  iconClear,
  iconError: <FontIcon className="fas fa-exclamation-triangle" />,
  iconValid: <FontIcon className="far fa-check-circle" />,
  MiniCartSummary,
  PhoneNumberInput,
  Price,
  QuantityInput,
  spinner,
  Select,
  SelectableItem,
  SelectableList,
  StockWarning,
  StripeForm,
  TextInput
};
