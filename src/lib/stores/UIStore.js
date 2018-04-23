import { observable, computed, action } from "mobx";
import getConfig from "next/config";

class UIStore {
  @observable _cartOpen = false;
  @observable _menuDrawerOpen = false;
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
    console.log("ui store toggle cart drawer");
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
    console.log("ui store toggle menu drawer");
    this.menuDrawerOpen = !this.menuDrawerOpen;
  };
}

export default UIStore;
