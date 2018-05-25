# Testing

See the [Architecture Decision Records #5](https://github.com/reactioncommerce/reaction-next-starterkit/tree/master/docs/architecture/decisions) about why we test the way we do.

## Patterns

### Higher-Order Components

> Concretely, a higher-order component is a function that takes a component and returns a new component.

[React HOC doc](https://reactjs.org/docs/higher-order-components.html)

- Test the component returned by higher-order-component or HOC functions as expected.

### Testing decorated components

Decorated components can be tested by providing the context necessary for those decorators to function. Where it permits, try to separate the component from its decorators.

### Testing components that have custom styles

Testing components that use custom attributes from the theme will need to use the Material UI theme provider, and import and use the default theme or a mock theme js object.

## Other Concerns

- Snapshot testing
- Testing component functionality like `onClick` events
- Integration testing
