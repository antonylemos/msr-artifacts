import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  }, [mount]);

  return <div ref={ref}></div>;
};
