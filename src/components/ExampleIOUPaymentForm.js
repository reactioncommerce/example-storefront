import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "reacto-form";
import { uniqueId } from "lodash";
import { withComponents } from "@reactioncommerce/components-context";
import { CustomPropTypes } from "@reactioncommerce/components/utils";

/**
 * Convert the form document to the object structure
 * expected by `PaymentsCheckoutAction`
 * @param {Object} Form object
 * @returns {Object} Transformed object
 */
function buildResult({ amount, fullName }) {
  let floatAmount = amount ? parseFloat(amount) : null;
  if (isNaN(floatAmount)) floatAmount = null;

  return {
    amount: floatAmount,
    data: { fullName },
    displayName: fullName ? `IOU from ${fullName}` : null
  };
}

class ExampleIOUPaymentForm extends Component {
  static propTypes = {
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Pass either the Reaction ErrorsBlock component or your own component that
       * accepts compatible props.
       */
      ErrorsBlock: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction Field component or your own component that
       * accepts compatible props.
       */
      Field: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction TextInput component or your own component that
       * accepts compatible props.
       */
      TextInput: CustomPropTypes.component.isRequired
    }),
    /**
     * Is the payment input being saved?
     */
    isSaving: PropTypes.bool,
    /**
     * Called as the form fields are changed
     */
    onChange: PropTypes.func,
    /**
     * When this action's input data switches between being
     * ready for saving and not ready for saving, this will
     * be called with `true` (ready) or `false`
     */
    onReadyForSaveChange: PropTypes.func,
    /**
     * Called with an object value when this component's `submit`
     * method is called. The object may have `data`, `displayName`,
     * and `amount` properties.
     */
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onChange() {},
    onReadyForSaveChange() {},
    onSubmit() {}
  };

  uniqueInstanceIdentifier = uniqueId("ExampleIOUPaymentForm");

  submit() {
    if (this.form) this.form.submit();
  }

  handleChange = (doc) => {
    const { onChange, onReadyForSaveChange } = this.props;

    const resultDoc = buildResult(doc);
    const stringDoc = JSON.stringify(resultDoc);
    if (stringDoc !== this.lastDoc) {
      onChange(resultDoc);
    }
    this.lastDoc = stringDoc;

    const isReady = !!doc.fullName;
    if (isReady !== this.lastIsReady) {
      onReadyForSaveChange(isReady);
    }
    this.lastIsReady = isReady;
  }

  handleSubmit = (doc) => {
    const { onSubmit } = this.props;
    return onSubmit(buildResult(doc));
  }

  render() {
    const {
      className,
      components: {
        ErrorsBlock,
        Field,
        TextInput
      },
      isSaving
    } = this.props;

    const fullNameInputId = `fullName_${this.uniqueInstanceIdentifier}`;
    const amountInputId = `amount_${this.uniqueInstanceIdentifier}`;

    return (
      <Form
        className={className}
        isReadOnly={isSaving}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        ref={(formRef) => { this.form = formRef; }}
      >
        <Field name="fullName" label="Full name" labelFor={fullNameInputId}>
          <TextInput id={fullNameInputId} name="fullName" />
          <ErrorsBlock names={["fullName"]} />
        </Field>
        <Field name="amount" label="Amount (optional)" labelFor={amountInputId}>
          <TextInput id={amountInputId} name="amount" />
          <ErrorsBlock names={["amount"]} />
        </Field>
      </Form>
    );
  }
}

export default withComponents(ExampleIOUPaymentForm);
