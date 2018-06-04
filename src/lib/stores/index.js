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
  if (query.limit) {
    uiStore.setPageSize(parseInt(query.limit, 10));
  }

  if (query.sortby) {
    uiStore.setSortBy(query.sortby);
  }
});

export default {
  authStore,
  routingStore,
  uiStore
};
