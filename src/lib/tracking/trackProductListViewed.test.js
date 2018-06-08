/* eslint-disable camelcase */
import dispatch from "./dispatch";
import trackProductListViewed from "./trackProductListViewed";

jest.mock("./dispatch", () => jest.fn());

test("component decorated with trackProductListViewed should dispatch tracking events", () => {
  const props = { props: 1 };
  const context = { context: 1 };
  const trackingContext = { dispatch };
  const data = {
    action: "Product List Viewed"
  };

  @trackProductListViewed(trackingContext)
  class TestComponent {
    static displayName = "TestComponent"
  }

  const instance = new TestComponent(props, context);

  expect(TestComponent.contextTypes.tracking).toBeDefined();
  expect(TestComponent.childContextTypes.tracking).toBeDefined();
  expect(instance.getChildContext().tracking.data).toEqual(data);
  expect(instance.render()).toBeDefined;

  instance.trackEvent({});
  expect(dispatch).toHaveBeenCalledWith(data);
});
