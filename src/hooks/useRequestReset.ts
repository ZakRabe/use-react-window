import debounce from "lodash.debounce";
import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import { VariableSizeList } from "react-window";

const useRequestReset = (
  listRef: MutableRefObject<VariableSizeList | null>,
  debounceMs = 100
) => {
  const resetIndex = useRef<number | null>(null);
  const flush = useCallback(() => {
    if (resetIndex.current === null) {
      return;
    }
    listRef.current?.resetAfterIndex(resetIndex.current);
    // console.log("flushed at index:", resetIndex.current);
    resetIndex.current = null;
  }, [listRef]);

  const debouncedFlush = useMemo(() => debounce(flush, debounceMs), [
    flush,
    debounceMs
  ]);

  const requestReset = useCallback(
    (index: number) => {
      // console.log("requested reset from index:", index);
      if (resetIndex.current === null || index < resetIndex.current) {
        resetIndex.current = index;
        debouncedFlush();
      }
    },
    [debouncedFlush]
  );

  return requestReset;
};

export default useRequestReset;
