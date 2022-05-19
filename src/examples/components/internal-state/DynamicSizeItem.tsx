import { FC, memo, useEffect, useState } from "react";
import { ListChildComponentProps } from "react-window";
import ListItem from "../ListItem";

const DynamicSizeItem: FC<ListChildComponentProps<any>> = (props) => {
  const { setItemSize } = props.data;
  const [isExpanded, setExpanded] = useState(false);
  useEffect(() => {
    setItemSize(props.index, isExpanded ? 200 : 100);
  }, [isExpanded]);
  return (
    <ListItem
      {...props}
      onClick={() => {
        setExpanded((prev) => !prev);
      }}
    >
      isExpanded: {isExpanded.toString()}
    </ListItem>
  );
};
export default memo(DynamicSizeItem);
