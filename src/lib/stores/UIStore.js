import { observable, computed, action } from "mobx";
import getConfig from "next/config";

/**
 * A mobx store for UI data
 * @class AuthStore
 */

class UIStore {
  /**
   * Is the cart drawer open or closed
   *
   * @type Boolean
   * @default false
   */
  @observable _cartOpen = false;

  /**
   * Is the menu drawer open or closed
   *
   * @type Boolean
   * @default false
   */
  @observable _menuDrawerOpen = false;

  /**
   * The number of items per page to display on the product grid.
   *
   * @type Number
   */
  @observable pageSize = 20;

  /**
   * App config data
   *
   * @type Object
   */
  @observable _appConfig = getConfig();

  @computed
  get cartOpen() {
    return this._cartOpen;
  }

  @computed
  get appConfig() {
    return this._appConfig;
  }

  set cartOpen(value) {
    this._cartOpen = value;
  }

  @action
  toggleCartOpen = () => {
    this.cartOpen = !this.cartOpen;
  };

  @computed
  get menuDrawerOpen() {
    return this._menuDrawerOpen;
  }

  set menuDrawerOpen(value) {
    this._menuDrawerOpen = value;
  }

  @action
  toggleMenuDrawerOpen = () => {
    this.menuDrawerOpen = !this.menuDrawerOpen;
  }

  @action setPageSize = (size) => {
    this.pageSize = size;
  }
}

export default UIStore;
