import React, { forwardRef, Fragment, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Box, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import useStripePaymentIntent from "./hooks/useStripePaymentIntent";
import StripeInput from "./StripeInput";

const useStyles = makeStyles(() => ({
  stripeForm: {
    display: "flex",
    flexDirection: "column"
  }
}));

function SplitForm(
  {
    isSaving,
    onSubmit,
    onReadyForSaveChange,
    stripeCardNumberInputLabel = "Card Number",
    stripeCardExpirationDateInputLabel = "Exp.",
    stripeCardCVCInputLabel = "CVC"
  },
  ref
) {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const options = useMemo(
    () => ({
      showIcon: true,
      style: {
        base: {
          fontSize: "18px"
        }
      }
    }),
    []
  );
  const [error, setError] = useState();

  const [formCompletionState, setFormCompletionState] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });

  const [isConfirmationInFlight, setIsConfirmationInFlight] = useState(false);

  const [createStripePaymentIntent] = useStripePaymentIntent();

  const isReady = useMemo(() => {
    const { cardNumber, cardExpiry, cardCvc } = formCompletionState;

    if (!isSaving && !isConfirmationInFlight && cardNumber && cardExpiry && cardCvc) return true;

    return false;
  }, [formCompletionState, isSaving, isConfirmationInFlight]);

  useEffect(() => {
    onReadyForSaveChange(isReady);
  }, [onReadyForSaveChange, isReady]);

  const onInputChange = useCallback(
    ({ elementType, complete }) => {
      if (formCompletionState[elementType] !== complete) {
        setFormCompletionState({
          ...formCompletionState,
          [elementType]: complete
        });
      }
    },
    [formCompletionState, setFormCompletionState]
  );

  const handleSubmit = useCallback(
    async (event) => {
      if (event) {
        event.preventDefault();
      }

      if (!stripe || !elements || isSaving || isConfirmationInFlight) {
        // Stripe.js has not loaded yet, saving is in progress or card payment confirmation is in-flight.
        return;
      }

      setError();
      setIsConfirmationInFlight(true);

      // Await the server secret here
      const { paymentIntentClientSecret } = await createStripePaymentIntent();

      const result = await stripe.confirmCardPayment(paymentIntentClientSecret, {
        // eslint-disable-next-line camelcase
        payment_method: {
          card: elements.getElement(CardNumberElement)
        }
      });

      setIsConfirmationInFlight(false);

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.error(result.error.message); // eslint-disable-line
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded" || result.paymentIntent.status === "requires_capture") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        const { amount, id } = result.paymentIntent;
        onSubmit({
          amount: amount ? parseFloat(amount / 100) : null,
          data: { stripePaymentIntentId: id },
          displayName: "Stripe Payment"
        });
      } else {
        console.error("Payment was not successful"); // eslint-disable-line
        setError("Payment was not successful");
      }
    },
    [createStripePaymentIntent, onSubmit, stripe, setError, isConfirmationInFlight, setIsConfirmationInFlight]
  );

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit();
    }
  }));

  return (
    <Fragment>
      <Box my={2}>
        <Grid container spacing={2}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <form onSubmit={handleSubmit} className={classes.stripeForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label={stripeCardNumberInputLabel}
                    name="ccnumber"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                        component: CardNumberElement,
                        options
                      }
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={onInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label={stripeCardExpirationDateInputLabel}
                    name="ccexp"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                        component: CardExpiryElement,
                        options
                      }
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={onInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label={stripeCardCVCInputLabel}
                    name="cvc"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                        component: CardCvcElement,
                        options
                      }
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={onInputChange}
                    required
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default forwardRef(SplitForm);
