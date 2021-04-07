module.exports = {

    /**
     * Get status of server using ping method and query if available
     * @param id Server IP and port to be pinged
     * @returns JSON API
     */
    getStatus: async function (id: string) {
        const query = require("./query")
        const ping = require("./ping")

        let tmp: Array<string> = id.split(":")
        let url: string = tmp[0];
        let port: string = tmp[1] || "25565";

        // Ping the server
        try {
            let pinged = await ping.getPing(url, port);

            // Initialize API JSON
            let api: statusAPI = {
                status: "online",
                online: true,
                ping: true,
                version: {
                    version: pinged.version.name,
                    protocol: pinged.version.protocol
                },
                players: {
                    online: pinged.players.online,
                    max: pinged.players.max
                },
                host: {
                    name: url,
                    port: port
                }
            }

            // Query the server
            try {
                // Get player list from query method
                let queried = await query.getQuery(url, port);
                api.query = true;
                api.players.list = queried.player_;
                api.version.version = queried.version;
                api.host.ip = queried.from.address;

            } catch (err) {
                // Else get player list from ping method
                api.players.list = [];
                try {
                    for (let i = 0; i < pinged.players.online; i++) {
                        api.players.list.push(pinged.players.sample[i].name);
                    }
                } catch {
                    // Player list does not match online count
                }
            }

            // Add favicon data if exists
            if (pinged.favicon) {
                api.favicon = pinged.favicon;
            }

            return api;
        } catch {
            return this._offline();
        }

    },

    /**
     * Return offline status
     * @returns {statusAPI} Offline status JSON
     */
    _offline: function (): statusAPI {
        let api: statusAPI = { status: "offline", online: false }
        return api;
    }
}

/**
 * The API returned after a query
 */
interface statusAPI {
    status: string;
    online: boolean;
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
    host?: {
        name: string;
        port?: string;
        ip?: string;
    };
    favicon?: string;
    plugins?: Array<string>;
    ping?: boolean;
    query?: boolean;
}