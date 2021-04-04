module.exports = {

    getStatus: async function (id: string) {
        const query = require("./query")
        const ping = require("./ping")


        let tmp: Array<string> = id.split(":")
        let url: string = tmp[0];
        let port: string = tmp[1] || "25565";

        try {
            let api = await ping.getPing(url, port);
            return api;
        } catch {
            return this._offline();
        }


    },

    _offline: function () {
        let statusAPI: statusAPI = {status: "offline"}
        return statusAPI;
    }
}


interface statusAPI {
    status: string;
    version?: {
        version: string;
        name: string;
        protocol: number;
    };
    players?: {
        online: string;
        max: string;
        players?: Array<string>;
    };
    hostport?: string;
    hostip?: string;
    favicon?: string;
    plugins?: Array<string>;
}