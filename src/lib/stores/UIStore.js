import { observable, computed, action } from "mobx";

class UIStore {
  @observable _cartOpen = false;
  @observable _menuDrawerOpen = false;

  @computed
  get cartOpen() {
    return this._cartOpen;
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
