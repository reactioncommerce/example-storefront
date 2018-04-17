import { configure } from "mobx";
import AuthStore from "./AuthStore";
import UIStore from "./UIStore";

configure({ enforceActions: true });

export default {
  authStore: new AuthStore(),
  uiStore: new UIStore()
};
