module.exports = {
    /**
     * Use query method to return JSON
     * @param {string} url Server url
     * @param {string} port Server port
     * @returns Server query JSON in a promise
     */
    getQuery: async function (url: string, port: string): Promise<string | JSON> {
        const Query = require('mcquery/lib');
        var query: any = new Query(url, port);
        return new Promise((resolve, reject) => {
            try {
                query.connect()
                    .then(() => {
                        query.full_stat((err: string, stat: JSON) => {
                            this._close(query);
                            err ? reject(err) : resolve(stat);
                        })
                    })
                    .catch((err: string) => {
                        this._close(query);
                        reject(err);
                    })
            } catch (err: any) {
                this._close(query);
                reject(err);
            }
        })
    },

    /**
     * Close query when request complete
     * @param {object} query Query instance
     */
    _close: function (query: any): void {
        if (query.outstandingRequests === 0) query.close();
    },
}