import http = require('http');
import uws = require('uws');

import { MessageHandler, SocketServerInterface } from './socket';
import { ProtocolSchema } from '../protocol/schema';

export class ServerSocket implements SocketServerInterface {
    private ws:uws|null = null;
    private onmessage:MessageHandler['server'] = {} as any;

    constructor (server:http.Server) {
        const wss = new uws.Server({server});

        wss.on('connection', (ws) => {
            this.ws = ws;
            ws.on('message', (msg) => {
                const {id, data} = JSON.parse(msg);
                this.onmessage[id](id, data);
            });
        });
    }

    public send<method extends keyof ProtocolSchema> (id:method, data:ProtocolSchema[method]['client']) {
        if (!this.ws) { return; }

        this.ws.send(JSON.stringify({
            id,
            data,
        }));
    }

    public sub<method extends keyof ProtocolSchema> (id:method, handler:MessageHandler['server'][method]) {
        this.onmessage[id] = handler;
    }

    public unsub<method extends keyof ProtocolSchema> (id:method) {
        this.onmessage[id] = () => {};
    }
}