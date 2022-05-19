import debounce from "lodash.debounce";
import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import { VariableSizeList } from "react-window";

const useRequestReset = (
  listRef: MutableRefObject<VariableSizeList>,
  debounceMs = 100
) => {
  const resetIndex = useRef<number | null>(null);
  const flush = useCallback(() => {
    if (resetIndex.current === null) {
      return;
    }
    listRef.current.resetAfterIndex(resetIndex.current);
    resetIndex.current = null;
  }, [listRef]);

  const debouncedFlush = useMemo(() => debounce(flush, debounceMs), [
    flush,
    debounceMs
  ]);

  const requestReset = useCallback(
    (index: number) => {
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
