import { observable, action } from "mobx";
import getConfig from "next/config";
import { PAGE_SIZES, inPageSizes } from "lib/utils/pageSizes";

/**
 * A mobx store for UI data
 * @class AuthStore
 */

class UIStore {
  /**
   * App config data
   *
   * @type Object
   */
  @observable appConfig = getConfig();

  /**
   * Is the cart drawer open or closed
   *
   * @type Boolean
   * @default false
   */
  @observable isCartOpen = false;

  /**
   * Is the cart popover open or closed
   *
   * @type Boolean
   * @default false
   */
  @observable isCartPopoverOpen = false;

  /**
   * Is the menu drawer open or closed
   *
   * @type Boolean
   * @default false
   */
  @observable isMenuDrawerOpen = false;

  /**
   * The number of items per page to display on the product grid.
   *
   * @type Number
   */
  @observable pageSize = PAGE_SIZES._20;

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

  /* ACTIONS */

  @action setPDPSelectedVariantId(variantId, optionId) {
    this.pdpSelectedVariantId = variantId;
    this.pdpSelectedOptionId = optionId;
  }

  @action closeCart() {
    this.isCartOpen = false;
  }

  @action toggleCartOpen() {
    this.isCartOpen = !this.isCartOpen;
  }

  @action openCartPopover() {
    this.isCartPopoverOpen = true;
  }

  @action closeCartPopover() {
    this.isCartPopoverOpen = false;
  }

  @action closeMenuDrawer() {
    this.isMenuDrawerOpen = false;
  }

  @action toggleMenuDrawerOpen() {
    this.isMenuDrawerOpen = !this.isMenuDrawerOpen;
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
