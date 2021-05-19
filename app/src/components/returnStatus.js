import React, { Component } from "react";
import "../App.scss"
import defaultfavicon from "../defaultserverfavicon.png"
import Info from "./info"
import Collapsible from "./collapse"

class ReturnStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            online: "",
            version: {},
            players: {},
            host: {},
            ping: false,
            query: false,
            favicon: defaultfavicon,
            fetched: false,
        };

    }

    callServer() {
        if (this.props.address !== "") {
            fetch(`http://${process.env.REACT_APP_API_ADDRESS}/server/${this.props.address}`)
                .then(res => res.json())
                .then(res => {
                    let favicon = res.favicon ? res.favicon : defaultfavicon;
                    let ping = res.ping ? "True" : "False";
                    let query = res.query ? "True" : "False";
                    if (res.online === true) {
                        this.setState({
                            status: res.status,
                            online: res.online,
                            version: res.version,
                            players: res.players,
                            host: res.host,
                            query: query,
                            ping: ping,
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
            this.setState({ fetched: false });
            this.callServer();
        }
    }

    lazyLoading() {
        return (
            <div id="placeholder">
                <div className="returnStat placeholder pulse">
                    <div className="gridBox2">
                        <div id="left">
                            <span className="favicon lazyFavicon"></span>
                        </div>
                        <div id="middle">
                            <span className="status lazyStatus" id="dot"></span>
                        </div>
                        <div id="right">
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    playerListToString(list, length) {
        let playerList = "";
        for (var i = 0; i < length; i++) {
            playerList += `${list[i]}, `
        };
        playerList = playerList.substring(0, playerList.length - 2);
        return playerList;
    }

    statusJSX() {
        let playerList = this.playerListToString(this.state.players.list, this.state.players.online)
        return (
            <div>
                {!this.state.fetched && this.lazyLoading()}
                {this.state.fetched && this.state.online &&
                    <div className="returnStat">
                        <div className="gridBox">
                            <div id="topRow" className="gridBox2">
                                <div id="left">
                                    <img className="favicon" src={this.state.favicon} alt="favicon" />
                                </div>
                                <div id="middle">
                                    <span style={{ color: 'greenyellow' }} id="dot">•</span>
                                    <h1 className="status">Online</h1>
                                </div>
                                <div id="right">
                                </div>
                            </div>
                            <div id="leftHalf">
                                <Info keys={"Version"} value={this.state.version.version} />
                                <Info keys={"Players"} value={this.state.players.online + "/" + this.state.players.max} />
                                {this.state.players.list.length > 0 &&
                                    <div>
                                        <Info keys={"List"} value={playerList} />
                                    </div>
                                }
                            </div>
                            <div id="rightHalf">
                                <Info keys={"Hostname"} value={this.state.host.name} />
                                <Info keys={"Port"} value={this.state.host.port} />
                                <Info keys={"IP"} value={this.state.host.ip} />
                            </div>
                            <div id="bottomRow">
                                <Collapsible title={"Technical info"} closeButton={"▼"} openButton={"▲"} buttonPosition={"left"}>
                                    <Info keys={"Protocol"} value={this.state.version.protocol} />
                                    <Info keys={"Ping"} value={this.state.ping} />
                                    <Info keys={"Query"} value={this.state.query} />
                                </Collapsible>
                            </div>
                        </div>
                    </div>
                }
                {this.state.fetched && !this.state.online &&
                    <div className="returnStat">
                        <div className="gridBox2">
                            <div id="left">
                                <img className="favicon" src={this.state.favicon} alt="favicon" />
                            </div>
                            <div id="middle">
                                <span style={{ color: 'red' }} id="dot">•</span>
                                <h1 className="status">Offline</h1>
                            </div>
                            <div id="right">
                            </div>
                        </div>
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