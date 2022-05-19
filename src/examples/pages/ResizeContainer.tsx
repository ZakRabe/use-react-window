import { FC, useRef } from "react";
import { FixedSizeList } from "react-window";
import { useListSize } from "../../hooks/useSize";
import ExampleWrapper from "../components/ExampleWrapper";
import ListItem from "../components/ListItem";
import { items } from "../data";

const Vertical: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const size = useListSize(wrapperRef, "vertical");

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div style={{ flex: "1 0 auto" }}>Column 1</div>
      <div ref={wrapperRef} style={{ flex: "1 0 auto" }}>
        <FixedSizeList itemSize={100} itemCount={items.length} {...size}>
          {ListItem}
        </FixedSizeList>
      </div>
      <div style={{ flex: "1 0 auto" }}>Column 3</div>
    </div>
  );
};

const Horizontal: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const size = useListSize(wrapperRef, "horizontal");

  return (
    <div
      ref={wrapperRef}
      style={{ display: "flex", height: "100%", width: "100%" }}
    >
      <FixedSizeList itemSize={100} itemCount={items.length} {...size}>
        {ListItem}
      </FixedSizeList>
    </div>
  );
};

const ResizeContainer: FC = () => {
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

export default ResizeContainer;
