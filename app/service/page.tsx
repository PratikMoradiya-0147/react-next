"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export default function Service({onSearch}) {
  // useState hook
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  // useEffect hook
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // useContext hook
  const ThemeContext = createContext("dark");
  const theme = useContext(ThemeContext);

  // useReducer hook
  function cartReducer(state, action) {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "remove":
        return state.filter((item) => item.id !== action.payload.id);
      default:
        return state;
    }
  }
  const [cart, dispatch] = useReducer(cartReducer, []);
  const addItem = (item) => {
    dispatch({ type: "add", payload: item });
  };
  const removeItem = (item) => {
    dispatch({ type: "remove", payload: item });
  };
  
  return (
    <div className="container">
      <div className="row m-3">
        <h1 className="mb-3">Welcome to Service Page</h1>

        {/* useState hook */}
        <p className="mb-3">
          The <b className="fs-3"> useState hook </b> allows you to add state to
          a functional component. It takes an initial value as an argument and
          returns an array with two elements: the current state value and a
          function to update it. Here’s an example of how to use useState to add
          a counter to a functional component:
        </p>

        <div className="mb-3">
          <p className="mb-2">Count: {count}</p>
          <button className="border border-info p-2 mr-2" onClick={increment}>
            Increment
          </button>
          <button className="border border-warning p-2" onClick={decrement}>
            Decrement
          </button>
        </div>

        {/* useEffect hook */}
        <p className="mb-3">
          The <b className="fs-3"> useEffect hook</b> allows you to perform side
          effects in a functional component. Side effects include things like
          fetching data from an API, updating the DOM, or subscribing to an
          event. Here’s an example of how to use useEffect to fetch data from an
          API:
        </p>

        <ul>
          {/* {data.length > 0 ? (data.map(item => ( <li key={item.id}>{item.name}</li>))) : (<p>Loading Data ...</p>  )} */}

          {/* {data.map(item => (
            <li key={item.id}>{item.name}</li>

          ))} */}
        </ul>

        {/* useContext hook */}
        <p>
          The <b className="fs-3">useContext hook</b> allows you to access a
          context object in a functional component. Context is a way to pass
          data down the component tree without having to pass props manually.
          Here’s an example of how to use useContext to access a theme context:
        </p>

        <button
          className="border border-info mb-3"
          style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
          }}
        >
          Toggle Theme
        </button>

        {/* useReducer hook */}
        <p className="mb-3">
          The <b className="fs-3">useReducer hook</b> allows you to manage
          complex state in a functional component. It’s similar to the useState
          hook, but instead of a simple value, it takes a reducer function and
          an initial state. Here’s an example of how to use useReducer to manage
          a shopping cart:
        </p>

        <div className="">
          <h2 className="mb-2 mr-10">Shopping Cart</h2>
          <button
            className="border border-info p-2"
            onClick={() => addItem({ id: 1, name: "Item 1", price: 9.99 })}
          >
            Add Item
          </button>
        </div>
        <ul className="mb-2">
          {cart.map((item) => (
            <li className="mr-2" key={item.id}>
              {item.name} - ${item.price}
              <button
                className="border border-warning ml-2 mb-2 p-2"
                onClick={() => removeItem(item)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        
      </div>
    </div>

    
  );
}
