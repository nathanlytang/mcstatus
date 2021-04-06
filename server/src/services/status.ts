module.exports = {

    getStatus: async function (id: string) {
        const query = require("./query")
        const ping = require("./ping")


        let tmp: Array<string> = id.split(":")
        let url: string = tmp[0];
        let port: string = tmp[1] || "25565";

        try {
            let pinged = await ping.getPing(url, port);


            let api: statusAPI = {
                status: "online",
                ping: true,
                version: {
                    version: pinged.version.name,
                    protocol: pinged.version.protocol
                },
                players: {
                    online: pinged.players.online,
                    max: pinged.players.max
                },
            }

            // Add favicon data if exists
            if (pinged.favicon) {
                api.favicon = pinged.favicon;
            }

            try {
                let queried = await query.getQuery(url, port);
                api.query = true;
            } catch {
                console.log("Query not supported")
            }

            return api;
        } catch {
            return this._offline();
        }


    },

    _offline: function () {
        let api: statusAPI = { status: "offline" }
        return api;
    }
}


interface statusAPI {
    status: string;
    version?: {
        version?: string;
        name?: string;
        protocol?: number;
    };
    players?: {
        online: string;
        max: string;
        list?: Array<string>;
    };
    hostport?: string;
    hostip?: string;
    favicon?: string;
    plugins?: Array<string>;
    ping?: boolean;
    query?: boolean;
}