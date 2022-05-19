import useResizeObserver from "@react-hook/resize-observer";
import { MutableRefObject, useLayoutEffect, useState } from "react";
import { VariableSizeListProps } from "react-window";

// https://www.npmjs.com/package/@react-hook/resize-observer

export const useSize = (targetRef: MutableRefObject<HTMLElement | null>) => {
  const [size, setSize] = useState<DOMRectReadOnly>(new DOMRectReadOnly());

  useLayoutEffect(() => {
    if (!targetRef.current) {
      return;
    }
    setSize(targetRef.current.getBoundingClientRect());
  }, [targetRef]);

  // Where the magic happens
  useResizeObserver(targetRef, (entry) => setSize(entry.contentRect));
  return size;
};
export default useSize;

export const useListSize = (
  wrapperRef: MutableRefObject<HTMLElement | null>,
  direction?: VariableSizeListProps["layout"]
): Pick<VariableSizeListProps, "height" | "width" | "direction"> => {
  const { height, width } = useSize(wrapperRef);

  return {
    height: direction === "horizontal" ? "100%" : height,
    width: direction === "vertical" ? "100%" : width,
    direction
  };
};
