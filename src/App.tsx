import "./styles.css";
import ResizingItems from "./examples/pages/ResizingItems";
import ResizeContainer from "./examples/pages/ResizeContainer";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <h1>use-react-window</h1>

      <h2>useRequestReset</h2>
      <p>
        Args: VariableSizeList ref debounceMs Returns: Stateless debounced
        callback wrapper around `VariableSizeList.resetAfterIndex`
      </p>

      <h2>useResizingItems</h2>
      <p>
        Args: VariableSizeList ref debounceMs Returns: Stateless debounced
        callback wrapper around `VariableSizeList.resetAfterIndex`
      </p>

      <h3>Internal state using VariableSizeList</h3>
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

      <ResizingItems />

      <h2>useListSize</h2>
      <p>
        Sometimes you want to render virtual items in a container that could
        change size, or we cant know it ahead of time. For example CSS Display
        types (such as flebox or grid), or media queries.
      </p>

      <p>
        Perhaps we want a vertical List that fills a flexbox column, or a
        horizontal list that fills a row.
      </p>

      <p>
        useListSize lets you watch a dom node's size, react statefully to any
        changes in the bounding client rectangle. the hook returns the width and
        height props needed for a react-window List/Grid, as well as the
        direction for List
      </p>
      <ResizeContainer />
    </div>
  );
}
