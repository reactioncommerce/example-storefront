import { configure } from "mobx";
import AuthStore from "./AuthStore";
import RoutingStore from "./RoutingStore";
import UIStore from "./UIStore";

configure({ enforceActions: true });

export default {
  authStore: new AuthStore(),
  routingStore: new RoutingStore(),
  uiStore: new UIStore()
};
