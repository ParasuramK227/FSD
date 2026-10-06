import React, { useState } from "react";

export default function CounterFunction() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(0);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Counter using Function Component</h2>
            <h1>{count}</h1>
            <button
                onClick={decrement}
                style={{
                    backgroundColor: "red",
                    color: "white",
                    margin: "5px",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px"
                }}
            >
                -
            </button>
            <button
                onClick={reset}
                style={{
                    margin: "5px",
                    padding: "8px 15px",
                    border: "1px solid gray",
                    borderRadius: "5px"
                }}
            >
                Reset
            </button>
            <button
                onClick={increment}
                style={{
                    backgroundColor: "green",
                    color: "white",
                    margin: "5px",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px"
                }}
            >
                +
            </button>
        </div>
    );
}