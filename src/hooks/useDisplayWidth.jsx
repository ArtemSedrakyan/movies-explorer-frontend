import { useState, useEffect, useCallback } from "react";

export default function useDisplayWidth() {
  const getDisplayWidth = useCallback(() => window.innerWidth, []);
  const [displayWidth, setDisplayWidth] = useState(getDisplayWidth());

  useEffect(() => {
    function handleDisplayResize() {
      setDisplayWidth(getDisplayWidth());
    };

    window.addEventListener('resize', resizeController, false);

    let resizeTimeout;

    function resizeController() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          handleDisplayResize();
        }, 1000);
      }
    };

    return () => window.removeEventListener('resize', handleDisplayResize);
  }, [getDisplayWidth]);

  return displayWidth;
};
