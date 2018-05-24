# Tracking Events

`reaction-next-starterkit` uses [Segment](https://segment.com/) and [NYTimes React Tracking][https://github.com/NYTimes/react-tracking] to track analytics events throughout the app.

You can see the source under `/lib/tracking`

## Using Segment

By default, this Reaction Starter Kit uses segment analytics tracking.

### Step 1. Obtain your API key from the segment dashboard

### Step 2. Add your API key
In the `.env` file, add at the root of the project add or update the `SEGMENT_ANALYTICS_WRITE_KEY` variable with your API key

```
SEGMENT_ANALYTICS_WRITE_KEY=ENTER_YOUR_SEGMENT_API_KEY
```

### Step 3. Test

With the app running, navigate or refresh the current page your own to trigger some tracking events. Visit the segment dashboard and verify that events are coming through successfully.

## Add Custom Tracking

### Step 1: Add a custom tracker

In the `config/analytics` directory you'll see a file `provider.example.js`. Copy and rename that file to `provider.js`, where provider can be any name you'd like.

In the `index.js` file in that same directory, import `provider.js` and add it to the array.

```
import * as segment from "./segment";
import * as provider from "./provider";

export default [
  segment,
  provider
];
```

### Step 2: Customize provider.js

In the provider.js file will contain two function `dispatch` and `renderScript`.

Dispatch is the final method that gets called with all accumuliated anilatics data for an event.

```
/**
 * Dispatch method
 * @name dispatchSegmentAnalytics
 * @ignore
 * @param {Object} data Arguments supplied by tracking library
 * @returns {undefined} No Return
 */
export function dispatch(data) {
  // Example that works with google tag manager
  window && window.dataLayer.push(data);
}
```

`renderStript` is a function that renders a string of javascript code for your tracking service. For example in `segment.js` we render the segment snuppet and return a string of that. This string will end up in head.

```
/**
 * Render string script
 * @returns {String} String JS script to be applied to head
 */
export function renderScript() {
  const { publicRuntimeConfig } = getConfig();

  // Key API key
  // add your api key to `publicRuntimeConfig` section of the next.config.js
  const { apiKey } = publicRuntimeConfig;

  // Return a javascript string that will be included in the HEAD of the rendered HTML document
  return "STRING_SCRIPT";
}
```

### Testing

You should now be able to send tracking data to the provider of your choice.


## Add Tracking to a page

```js
import React, { Component } from "react";
import track from "react-tracking";
import withTracking from "lib/tracking/withTracking";

@withTracking
@track(() => ({
  action: "Page Viewed"
}), {
  dispatchOnMount: true
})
class Page extends Component {
  render() {
    return <div>{"Page"}</div>;
  }
}

```