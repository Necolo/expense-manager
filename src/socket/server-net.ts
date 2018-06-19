import http = require('http');
import uws = require('uws');

export class ServerSocket {
    private _ws!:uws;
    public onmessage:MessageHanlder<any>[];

    constructor (server:http.Server) {
        const WebSocketServer = uws.Server;
        const wss = new WebSocketServer({
            server,
        });

        wss.on('connection', (ws) => {
            this._ws = ws;
            ws.on('message', (msg) => {
                const {id, data} = JSON.parse(msg);
            });
        });
    }
}