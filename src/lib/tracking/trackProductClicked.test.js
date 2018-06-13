import dispatch from "./dispatch";
import trackProductClicked from "./trackProductClicked";

jest.mock("./dispatch", () => jest.fn());

test("component decorated with trackProductClicked should dispatch tracking events", () => {
  const props = { props: 1 };
  const context = { context: 1 };
  const trackingContext = { dispatch };

  @trackProductClicked(trackingContext)
  class TestComponent {
    static displayName = "TestComponent"
  }

  const instance = new TestComponent(props, context);

  expect(TestComponent.contextTypes.tracking).toBeDefined();
  expect(TestComponent.childContextTypes.tracking).toBeDefined();
  expect(instance.getChildContext().tracking.data).toEqual({});
  expect(instance.render()).toBeDefined;

  const data = { data: 1 };
  instance.trackEvent(data);
  expect(dispatch).toHaveBeenCalledWith(data);
});
