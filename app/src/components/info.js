import React, { Component } from "react";
import "../App.scss"

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = { key: "", value: "" };
    }

    render() {
        const key = this.props.keys;
        const value = this.props.value;
        if (value === "" || value === undefined) {
            return null;
        } else {
            return (
                <p className="info">
                    <span className="keys">
                        <strong>{key}: </strong>
                    </span>
                    <span className="value">
                        {value}
                    </span>
                </p>
            );
        }
    }
}

export default Info;