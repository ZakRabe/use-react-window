import { MutableRefObject, useCallback, useRef } from "react";
import { VariableSizeList } from "react-window";
import useRequestReset from "./useRequestReset";

export const useResizingItems = (
  listRef: MutableRefObject<VariableSizeList | null>,
  defaultSizePx = 0
) => {
  const requestReset = useRequestReset(listRef);
  const sizeMap = useRef(new Map<number, number>());
  const getItemSize = useCallback(
    (index: number) => {
      const size = sizeMap.current.get(index) ?? defaultSizePx;
      console.log("getSize", index, size);
      return size;
    },
    [defaultSizePx]
  );

  const setItemSize = useCallback(
    (index: number, size: number) => {
      if (sizeMap.current.get(index) === size) {
        return;
      }
      sizeMap.current.set(index, size);
      requestReset(index);
    },
    [requestReset]
  );

  return { setItemSize, getItemSize };
};

export interface ResizingItemsData {
  setItemSize: (index: number, size: number) => void;
}

export default useResizingItems;
