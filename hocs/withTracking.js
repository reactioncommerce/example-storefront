import useTrackingEvents from "hooks/analytics/useTrackingEvents";

const withTracking = (PageComponent) => {
  const WithInjectedTracking = (props) => {
    const callTracking = useTrackingEvents();
    return (
      <PageComponent {...props} callTracking={callTracking} />
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName = PageComponent.displayName || PageComponent.name || "Component";
    WithInjectedTracking.displayName = `WithInjectedTracking(${displayName})`;
  }

  return WithInjectedTracking;
};

export default withTracking;
