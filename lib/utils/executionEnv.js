const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

/**
 * The ExecutionEnv object provides properties that should be used
 * to determine if the current execution environment is either client or server.
 * Further, other properties are available to determine if a browser
 * supports certain features.
 */
export const ExecutionEnv = {
  canUseDOM,
  canUseWorkers: typeof Worker !== "undefined",
  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),
  canUseViewport: canUseDOM && !!window.screen
};
