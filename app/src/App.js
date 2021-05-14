import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import InputForm from "./components/form";
import ReturnStatus from "./components/returnStatus"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "", address: "" };
    }

    getAddress = (data) => {
        this.setState({ address: data })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Server Status</h1>
                </header>

                <InputForm largeInput={"Get Status"} smallInput={"→"} placeholder={"Server address"} parentCallback={this.getAddress} />
                <ReturnStatus address={this.state.address} />

                {/* <p className="App-intro">{this.state.apiResponse}</p> */}
            </div>
        );
    }
}

export default App;