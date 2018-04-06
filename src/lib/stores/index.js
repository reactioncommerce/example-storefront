import { configure } from "mobx";
import UIStore from "./UIStore";

configure({ enforceActions: true });

export default {
  uiStore: new UIStore()
};
