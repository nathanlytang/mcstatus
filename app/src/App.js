import React, { Component } from "react";
import block from "./block.png"
import "./App.scss";
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
                    <h1 className="App-title"><img id="block" src={block} alt="block" />Server Status</h1>
                </header>
                <div id="description">
                    Minecraft Server Status Page
                </div>
                <InputForm largeInput={"Get Status"} smallInput={"→"} placeholder={"exampleserver.com / 123.123.123.123:25565"} parentCallback={this.getAddress} />
                <ReturnStatus address={this.state.address} />

                <div className="footer">
                    2021. Built by <a target="_blank" rel="noopener noreferrer" href="https://nathanlytang.com">Nathan Tang</a>.
                </div>
            </div>
        );
    }
}

export default App;