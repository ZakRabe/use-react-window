import { FC, useRef } from "react";
import { VariableSizeList } from "react-window";
import useResizingItems from "../../hooks/useResizingItems";
import DynamicSizeItem from "../components/internal-state/DynamicSizeItem";
import { items } from "../data";
import ExampleWrapper from "../components/ExampleWrapper";

function Vertical() {
  const listRef = useRef<VariableSizeList>(null);
  const { getItemSize, setItemSize } = useResizingItems(listRef);

  return (
    <VariableSizeList
      itemSize={getItemSize}
      itemData={{ setItemSize }}
      itemCount={items.length}
      direction="vertical"
      ref={listRef}
      height={500}
      width="100%"
    >
      {DynamicSizeItem}
    </VariableSizeList>
  );
}

const Horizontal: FC = () => {
  const listRef = useRef<VariableSizeList>(null);
  const { getItemSize, setItemSize } = useResizingItems(listRef);

  return (
    <VariableSizeList
      itemSize={getItemSize}
      itemData={{ setItemSize }}
      itemCount={items.length}
      direction="horizontal"
      ref={listRef}
      width={500}
      height="100%"
    >
      {DynamicSizeItem}
    </VariableSizeList>
  );
};

const ResizingItems: FC = () => {
  return (
    <>
      <h4>Vertical</h4>
      <ExampleWrapper>
        <Vertical />
      </ExampleWrapper>
      <h4>Horizontal</h4>
      <ExampleWrapper>
        <Horizontal />
      </ExampleWrapper>
    </>
  );
};

export default ResizingItems;
