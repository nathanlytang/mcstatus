module.exports = {
    /**
     * Use ping method to return JSON
     * @param {string} url Server URL 
     * @param {string} port Server port
     * @returns Server ping JSON in a promise
     */
    getPing: async function (url: string, port: string): Promise<string | JSON> {
        const mcping = require('mcping-js');
        const ping = new mcping.MinecraftServer(url, port);
        return new Promise((resolve, reject) => {
            try {
                ping.ping(4000, -1, (pingErr: string, res: JSON) => {
                    pingErr ? reject(pingErr) : resolve(res);
                })

            } catch (err) {
                reject(err);
            }
        })
    }
}