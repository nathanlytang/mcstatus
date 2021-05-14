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
        if (this.state.value !== "") {
            this.props.parentCallback(this.state.value);
        }
        event.preventDefault();
    }

    render() {
        const largeSubmitText = this.props.largeInput;
        const smallSubmiText = this.props.smallInput
        const placeholderText = this.props.placeholder;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder={placeholderText} autoFocus />
                </label>
                <input className="largeSubmit" type="submit" value={largeSubmitText} />
                <input className="smallSubmit" type="submit" value={smallSubmiText} />
            </form>
        );
    }
}

export default InputForm;