import { FC, memo, useRef, useMemo } from "react";
import {
  FixedSizeList,
  ListChildComponentProps,
  VariableSizeList
} from "react-window";
import useResizingItems from "../../hooks/useResizingItems";
import useVirtualState, {
  VirtualGet,
  VirtualSet
} from "../../hooks/useVirtualState";

import DynamicSizeItem from "../components/internal-state/DynamicSizeItem";
import { items } from "../data";
import ExampleWrapper from "../components/ExampleWrapper";
import ListItem from "../components/ListItem";
import useMountLog from "../../hooks/useMountLog";
import { useRender } from "../../hooks/useRender";

type SelectionData = {
  isSelected: VirtualGet<boolean>;
  setSelected: VirtualSet<boolean>;
};

const SelectableItem: FC<ListChildComponentProps<SelectionData>> = memo(
  (props) => {
    const {
      index,
      data: { isSelected, setSelected }
    } = props;
    const render = useRender();
    const selected = isSelected(index, render);
    useMountLog("Selectable:" + index);
    const content = useMemo(
      () => (
        <input
          checked={selected}
          onChange={(e) => setSelected(index, e.target.checked)}
          type="checkbox"
        />
      ),
      [selected, setSelected, index]
    );
    return <ListItem {...props}>{content}</ListItem>;
  }
);

const BooleanState: FC = () => {
  const listRef = useRef<FixedSizeList>(null);
  console.log(listRef.current);
  const [selectedItems, setSelected, isSelected] = useVirtualState(false);

  const itemData = useMemo(() => {
    console.log("itemData");
    return { isSelected, setSelected };
  }, [setSelected, isSelected]);

  return (
    <FixedSizeList
      itemSize={200}
      itemCount={items.length}
      itemData={itemData}
      layout="vertical"
      ref={listRef}
      height={500}
      width="100%"
    >
      {SelectableItem}
    </FixedSizeList>
  );
};

const VirtualState: FC = () => {
  return (
    <>
      <h4>Vertical</h4>
      <ExampleWrapper>
        <BooleanState />
      </ExampleWrapper>
    </>
  );
};

export default VirtualState;
