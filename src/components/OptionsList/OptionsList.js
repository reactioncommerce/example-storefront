import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";

import ProductDetailOption from "components/ProductDetailOption";

const styles = () => ({
  optionsContainer: {
    display: "flex",
    flex: "1 1 auto",
    flexWrap: "wrap"
  }
});

@withStyles(styles, { withTheme: true })
@observer
class OptionsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.object)
  }

  @observable _selectedOption = null;

  @computed
  get selectedOption() {
    return this._selectedOption;
  }

  set selectedOption(value) {
    this._selectedOption = value;
  }

  @action
  setOption = (option) => {
    this.selectedOption = option._id;
  }

  renderProductOption = (option) => {
    const isSelected = (this._selectedOption === option._id);

    return (
      <ProductDetailOption
        onClick={this.setOption}
        isSelected={isSelected}
        key={option._id}
        option={option}
      />
    );
  }

  render() {
    return (
      <div className={this.props.classes.optionsContainer}>
        {this.props.options.map(this.renderProductOption)}
      </div>
    );
  }
}

export default OptionsList;
