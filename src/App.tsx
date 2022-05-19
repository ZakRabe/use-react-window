import "./styles.css";
import RequstResize from "./examples/RequestResize";
import { FC } from "react";

const ExampleWrapper: FC = ({ children }) => (
  <div style={{ height: 500, width: "100%" }}>{children}</div>
);

export default function App(): JSX.Element {
  return (
    <div className="App">
      <h1>use-react-window</h1>

      <h2>
        <code>useRequestReset</code>
      </h2>
      <p>
        Args: VariableSizeList ref debounceMs Returns: Stateless debounced
        callback wrapper around `VariableSizeList.resetAfterIndex`
      </p>
      <h3>Vertical VariableSizeList</h3>
      <p>
        Notice the size the Virtual Item reports is based on isExpanded. The
        isExpanded state is internal to the Virtual Item component.
      </p>
      <p>
        This state is lost when Virtual Items are unmounted, so scrolling an
        item in/out of the virtualization window resets the isExpanded state
      </p>
      <p>
        If Items mount and unmount at different sizes, it can lead to jumpy
        scroll bars. This is why I reccomend using external state passed to the
        virtual item via the getters on the data prop, if that state influences
        the size of the Item.
      </p>

      <ExampleWrapper>
        <RequstResize />
      </ExampleWrapper>

      <h2>
        <code>useResizingItems</code>
      </h2>
      <p>
        Args: VariableSizeList ref debounceMs Returns: Stateless debounced
        callback wrapper around `VariableSizeList.resetAfterIndex`
      </p>
    </div>
  );
}
