import React, {useState} from "react";

function App() {
    const [count, setCount] = useState(0);
    let inc = () => setCount(count + 1);
    let dec = () => setCount(count - 1);
    return (
        <div className="App">
            <h1>{count}</h1>
            <button onClick = {inc}>Increment</button>
            <button onClick = {dec}>Decrement</button>
        </div>
  );
}

export default App;
