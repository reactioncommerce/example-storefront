import { observable, computed } from "mobx";

export default class RoutingStore {
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
