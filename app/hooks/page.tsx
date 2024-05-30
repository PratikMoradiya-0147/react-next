"use client";

import {
  useCallback,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

// useImperativeHandle hook
const Input = (props, ref) => {
  const inputRef: any = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    value: inputRef.current.value,
  }));

  return <input type="text" ref={inputRef} placeholder={props.placeholder} />;
};

export default function Hooks({ onSearch, a, b, url }) {
  // useCallback hook
  const [query, setQuery] = useState("");
  const handleQueryChange = useCallback(
    (event) => {
      setQuery(event.target.value);
      onSearch(event.target.value);
    },
    [onSearch]
  );

  // useMemo hook
  const result = useMemo(() => {
    console.log("Calculating...");
    return a * b;
  }, [a, b]);

  // useRef hook
  const inputRef: any = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  // useDebugValue hook
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  useDebugValue(data ? `Data loaded: ${data.length} items` : "Loading...");
  data;

  // useImperativeHandle hook

  return (
    <div className="container">
      <div className="row m-3">
        {/* useCallback hook */}
        <p className="mb-3">
          The <b className="fs-3">useCallback hook</b> allows you to memoize a
          function so that it’s only re-created when its dependencies change.
          This can help improve performance by preventing unnecessary
          re-renders. Here’s an example of how to use useCallback to memoize a
          function:
        </p>

        <input
          className="mb-3 border border-primary input input-text"
          type="text"
          value={query}
          onChange={handleQueryChange}
        />

        {/* useMemo hook */}
        <p className="mb-3">
          The useMemo hook allows you to memoize a value so that it’s only
          re-computed when its dependencies change. This can help improve
          performance by preventing unnecessary re-computations. Here’s an
          example of how to use useMemo to memoize a calculated value:
        </p>

        <p className="mb-3">Result: {result}</p>

        {/* useRef hook */}
        <p className="mb-3">
          The useRef hook allows you to create a mutable ref object that
          persists for the lifetime of the component. You can use it to store
          and access values that don’t trigger a re-render. Here’s an example of
          how to use useRef to access the value of an input element:
        </p>

        <div className="mb-3">
          <input
            className="mr-3 input input-text
          "
            type="text"
            ref={inputRef}
          />
          <button onClick={handleClick} className="mb-3">
            Focus Input
          </button>
        </div>

        {/* useDebugValue hook */}
        <p className="mb-3">
          <b className="mb-3">useDebugValue</b> is a hook that allows you to
          display custom debugging information for custom hooks in the React
          DevTools. This can be useful for debugging hooks and understanding
          what is happening behind the scenes. Here’s an example of how to use
          useDebugValue:
        </p>

        {/* useImperativeHandle hook */}
        <p className="mb-3">
          The <b className="mb-3">useImperativeHandle hook</b> allows you to
          customize the instance value that is exposed to parent components when
          using ref. This can be useful when you need to provide a certain
          interface to parent components, but you dont want to expose all of the
          internal implementation details of a child component. Here’s an
          example of how to use useImperativeHandle:
        </p>

        {/* <div>
          <Input ref={inputRef} placeholder="Type here" />
          <button onClick={handleClick}>Focus input</button>
        </div> */}
      </div>
    </div>
  );
}
