import iconClear from "@reactioncommerce/components/svg/iconClear";
import iconError from "@reactioncommerce/components/svg/iconError";
import iconValid from "@reactioncommerce/components/svg/iconValid";
import iconAmericanExpress from "@reactioncommerce/components/svg/iconAmericanExpress";
import iconDiscover from "@reactioncommerce/components/svg/iconDiscover";
import iconMastercard from "@reactioncommerce/components/svg/iconMastercard";
import iconVisa from "@reactioncommerce/components/svg/iconVisa";
import spinner from "@reactioncommerce/components/svg/spinner";
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
import TextInput from "@reactioncommerce/components/TextInput/v1";
import withLocales from "./lib/utils/withLocales";

// Providing locales data
const AddressFormWithLocales = withLocales(AddressForm);

export default {
  AddressForm: AddressFormWithLocales,
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
  iconAmericanExpress,
  iconClear,
  iconDiscover,
  iconError,
  iconMastercard,
  iconValid,
  iconVisa,
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
