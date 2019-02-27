import { observable, action } from "mobx";
import { PAGE_SIZES, inPageSizes } from "lib/utils/pageSizes";

/**
 * A mobx store for UI data
 * @class UIStore
 */

class UIStore {
  /**
   * Is the cart drawer open or closed
   *
   * @type Boolean
   * @default false
   */
  @observable isCartOpen = false;

  /**
   * Is the menu drawer open or closed
   *
   * @type Boolean
   * @default false
   */
  @observable isMenuDrawerOpen = false;

  /**
   * Default display language for shop text, when translations are available.
   *
   * @type String
   * @default "en"
   */
  @observable language = "en";

  /**
   * Shop locales info loaded via a json file if needed.
   *
   * @type Object
   * @default {}
   */
  @observable locales = {};

  /**
   * Return orders with these order status values
   *
   * @type Array
   * @default []
   */
  @observable orderStatusQuery = [];

  /**
   * Limit for results of queries for multiple orders
   *
   * @type Number
   * @default 5
   */
  @observable orderQueryLimit = 5;

  /**
   * The number of items per page to display on the product grid.
   *
   * @type Number
   */
  @observable pageSize = PAGE_SIZES._20;

  /**
   * App config data
   * The ID of the option that is selected on the product detail page. This is not
   * tracked per product, so the assumption is that you can only view one detail page
   * at a time. The page must reset this before initial mount.
   *
   * @type String
   */
  @observable pdpSelectedOptionId = null;

  /**
   * The ID of the variant that is selected on the product detail page. This is not
   * tracked per product, so the assumption is that you can only view one detail page
   * at a time. The page must reset this before initial mount.
   *
   * @type String
   */
  @observable pdpSelectedVariantId = null;

  /**
   * The product grid's sorting order
   *
   * @type string
   */
  @observable sortBy = "updatedAt-desc";

  /**
   * The sort by currency code
   *
   * @type string
   */
  @observable sortByCurrencyCode = "USD";

  /* ACTIONS */
  /**
   * @name setLocales
   * @summary adds loaded locales data to store.
   * @param {Object} locales locales data loaded via json.
   * @returns {undefined} No return
   */
  @action setLocales(locales) {
    this.locales = locales;
  }

  @action setPDPSelectedVariantId(variantId, optionId) {
    this.pdpSelectedVariantId = variantId;
    this.pdpSelectedOptionId = optionId;
  }

  /**
   * @name openCart
   * @summary Open the mini-cart drawer
   * @returns {undefined} No return
   */
  @action openCart = () => {
    this.isCartOpen = true;
    this.clearOpenCartTimeout();
  }

  /**
   * @name closeCart
   * @summary Close the mini-cart drawer, optionally supply a delay
   * @param {Number} delay Time in milliseconds to keep cart open after which it will be closed
   * @returns {undefined} No return
   */
  @action closeCart = (delay = 500) => {
    this.openCartTimeout = setTimeout(action(() => {
      this.isCartOpen = false;
      this.clearOpenCartTimeout();
    }), delay);
  }

  @action openCartWithTimeout = (delay = 3000) => {
    this.openCart();

    this.openCartTimeout = setTimeout(action(() => {
      this.isCartOpen = false;
      clearTimeout(this.openCartTimeout);
    }), delay);
  }

  /**
   * @name clearOpenCartTimeout
   * @summary Clear the cart open timeout
   * @returns {undefined} No return
   */
  clearOpenCartTimeout = () => {
    this.openCartTimeout && clearTimeout(this.openCartTimeout);
  }

  @action toggleCartOpen() {
    this.isCartOpen = !this.isCartOpen;
  }

  @action closeMenuDrawer() {
    this.isMenuDrawerOpen = false;
  }

  @action toggleMenuDrawerOpen() {
    this.isMenuDrawerOpen = !this.isMenuDrawerOpen;
  }

  /**
   * @name setOrderStatusSelectValue
   * @summary Sets the order statuses to search for
   * @param {Array} orderStatus Order statuses to filter by
   * @returns {undefined} No return
   */
  @action setOrderStatusSelectValue(orderStatus) {
    this.orderStatusQuery = orderStatus;
  }

  @action setPageSize = (size) => {
    // Validate page size
    this.pageSize = inPageSizes(size) ? size : PAGE_SIZES._20;
  }

  @action setSortBy = (sortBy) => {
    this.sortBy = sortBy;
  }
}

export default UIStore;
