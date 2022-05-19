import { FC, useEffect, useRef, useState } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import useResizingItems, { ResizingItemsData } from "../hooks/useResizingItems";
// TODO: Support string ids
const items = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 }
];

const Item: FC<ListChildComponentProps<ResizingItemsData>> = ({
  data,
  index,
  style
}) => {
  const { setItemSize } = data;
  const [isExpanded, setExpanded] = useState(false);
  useEffect(() => {
    setItemSize(index, isExpanded ? 200 : 100);
  }, [isExpanded]);
  return (
    <div
      style={{ ...style, border: "1px solid red" }}
      onClick={() => {
        setExpanded((prev) => !prev);
      }}
    >
      <div>index: {index}</div>
      <div>expanded: {isExpanded.toString()}</div>
      <div>
        data:
        <div>
          <code>{Object.keys(data)}</code>
        </div>
      </div>
    </div>
  );
};

const Vertical: FC = () => {
  const listRef = useRef<VariableSizeList>(null);
  const { getItemSize, setItemSize } = useResizingItems(listRef);

  return (
    <VariableSizeList
      itemSize={getItemSize}
      itemData={{ setItemSize }}
      itemCount={items.length}
      height={500}
      ref={listRef}
      width="100%"
    >
      {Item}
    </VariableSizeList>
  );
};

const RequestResize: FC = () => {
  return (
    <>
      <Vertical />
    </>
  );
};

export default RequestResize;
