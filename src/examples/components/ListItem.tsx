import { FC, memo } from "react";
import { ListChildComponentProps } from "react-window";

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
// TODO: Use Component Prop instead of children
// This approach is bad. because the content of the list item rerenders on every scroll
const ListItem: FC<ListChildComponentProps<any> & DivProps> = ({
  data,
  index,
  style,
  children,
  ...wrapperProps
}) => {
  return (
    <div
      // -1 margin
      style={{ ...style, backgroundColor: "rgba(255,0,0,.3)" }}
      {...wrapperProps}
    >
      <div
        style={{
          border: "1px solid red",
          width: "calc(100% - 2px)",
          height: "calc(100% - 2px)"
        }}
      >
        <div>index: {index}</div>
        <div>
          data:
          <div>
            <code>{Object.keys(data || {})}</code>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
export default memo(ListItem);
