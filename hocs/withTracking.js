import useTrackingEvents from "hooks/analytics/useTrackingEvents";

const withTracking = (PageComponent) => {
  return (props) => {
    const callTracking = useTrackingEvents();
    return (
      <PageComponent {...props} callTracking={callTracking} />
    );
  };
};

export default withTracking;
