import React, { Component } from "react";
import "../App.css"
import defaultfavicon from "../defaultserverfavicon.png"

class ReturnStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            online: "",
            version: {},
            players: {},
            host: {},
            query: "",
            favicon: defaultfavicon,
            fetched: false,
        };

    }

    callServer() {
        if (this.props.address !== "") {
            fetch(`http://localhost:9000/server/${this.props.address}`)
                .then(res => res.json())
                .then(res => {
                    let favicon;
                    res.favicon ? favicon = res.favicon : favicon = defaultfavicon;
                    if (res.online === true) {
                        this.setState({
                            status: res.status,
                            online: res.online,
                            version: res.version,
                            players: res.players,
                            host: res.host,
                            query: res.query,
                            favicon: favicon,
                            fetched: true,
                        });
                    } else {
                        this.setState({
                            status: res.status,
                            online: res.online,
                            favicon: favicon,
                            fetched: true,
                        });
                    }
                })
                .catch(err => err);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.address !== prevProps.address) {
            this.callServer()
        }
    }

    lazyLoading() {

    }

    statusJSX() {
        return (
            <div className="returnStat">{
                this.state.fetched &&
                <div>
                    <img src={this.state.favicon} alt="favicon" />
                    <h1>{this.state.status}</h1>
                </div>
            }
            </div>
        );
    }

    render() {
        console.log(this.state.favicon)
        if (this.props.address !== "") {
            return this.statusJSX()
        } else {
            return null;
        }
    }
}

export default ReturnStatus;