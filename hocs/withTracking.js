import useTrackingEvents from "hooks/analytics/useTrackingEvents";

const withTracking = () => (PageComponent) => {
  const WithInjectedStores = (props) => {
    const callTracking = useTrackingEvents();
    return (
      <PageComponent {...props} callTracking={callTracking} />
    );
  };

    // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName = PageComponent.displayName || PageComponent.name || "Component";
    WithInjectedStores.displayName = `withInjectedStores(${displayName})`;
  }

  return WithInjectedStores;
};

export default withTracking;
