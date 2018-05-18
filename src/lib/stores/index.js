import { configure } from "mobx";
import AuthStore from "./AuthStore";
import PdpStore from "./PdpStore";
import RoutingStore from "./RoutingStore";
import UIStore from "./UIStore";

configure({ enforceActions: true });

export default {
  authStore: new AuthStore(),
  pdpStore: new PdpStore(),
  routingStore: new RoutingStore(),
  uiStore: new UIStore()
};
