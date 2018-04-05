import { observable, computed, action } from "mobx";

class UIStore {
  @observable _cartOpen = true;

  @computed get cartOpen() {
    return this._cartOpen;
  }

  set cartOpen(value) {
    this._cartOpen = value;
  }

  @action toggleCartOpen() {
    this.cartOpen = !this.cartOpen;
  }
}

export default UIStore;
