import { useCallback, useRef } from "react";

/**
 * expose a Map ref, and referentially safe getter and setter
 */
export const useVirtualState = <TItemState>(emptyValue: TItemState) => {
  const map = useRef(new Map<number, TItemState>());
  const itemTriggers = useRef(new Map<number, () => void>());

  const set = useCallback(
    (index: number, value: TItemState) => {
      map.current.set(index, value);
      const render = itemTriggers.current.get(index);
      render?.();
    },
    [map]
  );

  const get = useCallback(
    (index: number, render: () => void) => {
      console.log("get", index);
      itemTriggers.current.set(index, render);
      return map.current.get(index) ?? emptyValue;
    },
    [map]
  );

  const remove = useCallback(
    (index: number) => {
      console.log("delete", index);
      itemTriggers.current.delete(index);
      return map.current.delete(index);
    },
    [map]
  );

  return [map, set, get, remove];
};

export default useVirtualState;

export type VirtualGet<TItemState> = (
  index: number,
  render: () => void
) => TItemState;
export type VirtualSet<TItemState> = (index: number, value: TItemState) => void;
