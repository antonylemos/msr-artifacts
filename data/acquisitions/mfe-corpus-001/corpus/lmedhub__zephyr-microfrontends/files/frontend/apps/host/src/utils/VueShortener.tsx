import { useRef, useEffect } from "react";

const VueShortener = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadVueComponent = async () => {
      try {
        // @ts-ignore
        const { createApp } = await import("vue");
        // @ts-ignore
        const Shortener = await import("url_shortener/Shortener");

        if (containerRef.current) {
          const app = createApp(Shortener.default);
          app.mount(containerRef.current);
        }
      } catch (error) {
        console.error("Failed to load Vue component:", error);
      }
    };

    loadVueComponent();
  }, []);

  return <div ref={containerRef}></div>;
};

export default VueShortener;
