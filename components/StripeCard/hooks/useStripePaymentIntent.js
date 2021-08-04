import { useMutation } from "@apollo/client";
import useCartStore from "hooks/globalStores/useCartStore";
import useShop from "hooks/shop/useShop";

import createStripePaymentIntentMutation from "./createStripePaymentIntent.gql";

export default function useStripePaymentIntent() {
  const shop = useShop();
  const { accountCartId, anonymousCartId, anonymousCartToken } = useCartStore();

  const [createStripePaymentIntentFunc, { loading }] = useMutation(createStripePaymentIntentMutation);

  const createStripePaymentIntent = async () => {
    const { data } = await createStripePaymentIntentFunc({
      variables: {
        input: {
          cartId: anonymousCartId || accountCartId,
          shopId: shop?._id,
          cartToken: anonymousCartToken
        }
      }
    });

    return data?.createStripePaymentIntent;
  };

  return [createStripePaymentIntent, loading];
}
