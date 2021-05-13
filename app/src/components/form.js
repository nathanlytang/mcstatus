import React, { Component } from "react";
import "../App.css"

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        const inputText = this.props.input;
        const placeholderText = this.props.placeholder;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder={placeholderText} />
                </label>
                <input type="submit" value={inputText} />
            </form>
        );
    }
}

export default InputForm;