import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { use } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const onParentNavigateRef = useRef(null);

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        navigate(nextPathname);
      },
      initialPath: location.pathname,
    });

    onParentNavigateRef.current = onParentNavigate;
  }, []);

  useEffect(() => {
    if (onParentNavigateRef.current) {
      onParentNavigateRef.current({ pathname: location.pathname });
    }
  }, [location]);

  return <div ref={ref} />;
};
