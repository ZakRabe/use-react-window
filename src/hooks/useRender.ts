import { useState, useCallback } from "react";

/** force a re-render passed to VirtualGetter to trigger update in Virtual Item */
export const useRender = () => {
  const [, trigger] = useState(false);
  const rerender = useCallback(() => {
    trigger((prev) => !prev);
  }, []);
  return rerender;
};
