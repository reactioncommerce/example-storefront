import { observable, computed, action } from "mobx";

/**
 * A mobx store for PDP data
 * @class PdpStore
 */

class PdpStore {
  /**
   * Selected option on the PDP
   *
   * @type String
   * @default null
   */
  @observable _selectedOption = null;

  @computed
  get selectedOption() {
    return this._selectedOption;
  }

  set selectedOption(value) {
    this._selectedOption = value;
  }

  @action
  selectOption = (option) => {
    this.selectedOption = option._id;
  }
}

export default PdpStore;
