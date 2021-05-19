import React, { Component } from "react";
import "../App.scss"

class Collapsible extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(state => ({
            open: !state.open
        }));
        document.getElementById("description").classList.add("animate");
    }

    titlePosition(title, openButton, closeButton, position) {
        if (position === "left") {
            return (
                <div>
                    <span id="arrow">{this.state.open ? closeButton : openButton}</span>
                    <span id="title">{title}</span>
                </div>
            );
        } else if (position === "right") {
            return (
                <div>
                    <span id="title">{title}</span>
                    <span id="arrow">{this.state.open ? closeButton : openButton}</span>
                </div>
            );
        }
    }

    render() {
        const title = this.props.title;
        const openButton = this.props.openButton;
        const closeButton = this.props.closeButton;
        const position = this.props.buttonPosition

        return (
            <div className="collapsible">
                <button className="active" onClick={this.toggle}>
                    {this.titlePosition(title, openButton, closeButton, position)}
                </button>
                <div className="description">
                    {this.state.open &&
                        <div>
                            {this.props.children}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Collapsible;