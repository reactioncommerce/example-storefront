import useStores from "hooks/useStores";
import useShop from "hooks/shop/useShop";
import useTags from "hooks/useTags";

// eslint-disable-next-line no-unused-vars
const withInjectedStores = (injections) => (PageComponent) => {
  const WithInjectedStores = (props) => {
    const stores = useStores();
    const shop = useShop();
    const tags = useTags();

    const navItems = shop && shop.defaultNavigationTree;
    const primaryShopId = shop && shop._id;

    return (
      <PageComponent {...props} {...stores} primaryShopId={primaryShopId} tags={tags}
        navItems={navItems}
      />
    );
  };

    // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName = PageComponent.displayName || PageComponent.name || "Component";
    WithInjectedStores.displayName = `withInjectedStores(${displayName})`;
  }

  return WithInjectedStores;
};

export default withInjectedStores;
