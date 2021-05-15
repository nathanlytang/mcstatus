import React, { Component } from "react";
import "../App.scss"
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

    hideLazyLoading() {
        document.getElementById("lazy").style.display = "none";
    }

    playerListToString(list, length) {
        let playerList = ""
        for (var i = 0; i < length; i++) {
            playerList += `${list[i]}, `
        }
        playerList = playerList.substring(0, playerList.length - 2);
        return playerList
    }

    statusJSX() {
        console.log(this.state.players.list)
        let playerList = this.playerListToString(this.state.players.list, this.state.players.online)
        return (
            <div>
                <div id="lazy">
                    lazy
                </div>
                {this.state.fetched && this.state.online &&
                    <div className="returnStat">
                        <div>
                            <img className="favicon" src={this.state.favicon} alt="favicon" />
                            <span style={{ color: 'greenyellow' }} id="dot">•</span>
                            <h1 className="status">Online</h1>
                        </div>
                        <p className="info"><strong>Version:</strong> {this.state.version.version}</p>
                        <p className="info"><strong>Players:</strong> {this.state.players.online}/{this.state.players.max}</p>
                        {this.state.players.list.length > 0 &&
                            <div>
                                <p className="info"><strong>List:</strong> {playerList}</p>
                            </div>
                        }
                        {this.hideLazyLoading()}
                    </div>
                }
                {this.state.fetched && !this.state.online &&
                    <div className="returnStat">
                        <div>
                            <img className="favicon" src={this.state.favicon} alt="favicon" />
                            <span style={{ color: 'red' }} id="dot">•</span>
                            <h1 className="status">Offline</h1>
                        </div>
                        {this.hideLazyLoading()}
                    </div>
                }
            </div>
        );
    }

    render() {
        if (this.props.address !== "") {
            return this.statusJSX()
        } else {
            return null;
        }
    }
}

export default ReturnStatus;