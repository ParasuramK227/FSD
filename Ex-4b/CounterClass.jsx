import React, { Component } from "react";

export default class CounterClass extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    increment = () => this.setState({ count: this.state.count + 1 });
    decrement = () => this.setState({ count: this.state.count - 1 });
    reset = () => this.setState({ count: 0 });

    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Counter using Class Component</h2>
                <h1>{this.state.count}</h1>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.reset}>Reset</button>
                <button onClick={this.increment}>+</button>
            </div>
        );
    }
}