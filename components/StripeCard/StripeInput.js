import React, { useImperativeHandle, useRef } from "react";

function StripeInput({ component: Component, inputRef, ...props }) {
  const elementRef = useRef();
  useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current.focus
  }));
  return (
    <Component
      onReady={(element) => {
        elementRef.current = element;
      }}
      {...props}
    />
  );
}

export default StripeInput;
