import { observable, computed, action } from "mobx";
import getConfig from "next/config";

class RoutingStore {
  @observable _pathname = "";
  @observable _query = "";

  @computed
  get pathname() {
    return this._pathname;
  }

  set pathname(value) {
    this._pathname = value;
  }

  @computed
  get query() {
    return this._query;
  }

  set query(value) {
    this._query = value;
  }
}

export default RoutingStore;
