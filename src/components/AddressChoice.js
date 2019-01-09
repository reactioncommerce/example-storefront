import React, { Component } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import { addressToString, CustomPropTypes } from "@reactioncommerce/components/utils";

class AddressChoice extends Component {
  static propTypes = {
    /**
     * A list of addresses to show for selection
     */
    addresses: CustomPropTypes.addressBook,
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
       * Pass either the Reaction AddressForm component or your own component that
       * accepts compatible props.
       */
      AddressForm: CustomPropTypes.component.isRequired,
      /**
       * A reaction SelectableList component or compatible component.
       */
      SelectableList: CustomPropTypes.component.isRequired
    }),
    /**
     * Disable editing?
     */
    isReadOnly: PropTypes.bool,
    /**
     * Called with an address whenever the selected or entered
     * address changes. If they selected one, it will be the
     * complete address that was passed in `addresses`. If they're
     * entering one, it will be whatever they have entered so far
     * and may be partial.
     */
    onChange: PropTypes.func,
    /**
     * The label for the "Use a different address" selection item, if it
     * is shown.
     */
    otherAddressLabel: PropTypes.string
  };

  static defaultProps = {
    isReadOnly: false,
    onChange() {},
    otherAddressLabel: "Use a different address"
  };

  constructor(props) {
    super(props);

    let selectedOption = "OTHER";
    if (Array.isArray(props.addresses) && props.addresses.length > 0) {
      selectedOption = "0";
    }

    this.state = { selectedOption };
  }

  handleChangeAddress = (address) => {
    this.props.onChange(address);
  }

  handleChangeSelection = (selectedOption) => {
    const { addresses } = this.props;

    this.setState({ selectedOption });

    if (selectedOption !== "OTHER" && Array.isArray(addresses)) {
      this.props.onChange(addresses[Number(selectedOption)]);
    }
  }

  renderSelectList() {
    const {
      addresses,
      components: { SelectableList },
      isReadOnly,
      otherAddressLabel
    } = this.props;
    const { selectedOption } = this.state;

    if (!Array.isArray(addresses) || addresses.length === 0) return null;

    const listOptions = addresses.map((address, index) => ({
      id: String(index),
      label: addressToString(address, { includeFullName: true }),
      value: String(index)
    }));

    listOptions.push({
      id: "OTHER",
      label: otherAddressLabel,
      value: "OTHER"
    });

    return (
      <SelectableList
        name="addressList"
        isReadOnly={isReadOnly}
        onChange={this.handleChangeSelection}
        options={listOptions}
        value={selectedOption}
      />
    );
  }

  render() {
    const { className, components: { AddressForm }, isReadOnly } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className={className}>
        {this.renderSelectList()}
        {selectedOption === "OTHER" && <AddressForm isReadOnly={isReadOnly} onChange={this.handleChangeAddress} />}
      </div>
    );
  }
}

export default withComponents(AddressChoice);
