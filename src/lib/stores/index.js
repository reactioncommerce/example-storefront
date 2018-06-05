import { autorun, configure } from "mobx";
import AuthStore from "./AuthStore";
import RoutingStore from "./RoutingStore";
import UIStore from "./UIStore";

configure({ enforceActions: true });

const authStore = new AuthStore();
const routingStore = new RoutingStore();
const uiStore = new UIStore();

autorun(() => {
  const { query } = routingStore;
  if (query && Object.prototype.hasOwnProperty.call(query, "limit")) {
    uiStore.setPageSize(parseInt(query.limit, 10));
  }

  if (query && Object.prototype.hasOwnProperty.call(query, "sortby")) {
    uiStore.setSortBy(query.sortby);
  }
});

export default {
  authStore,
  routingStore,
  uiStore
};
