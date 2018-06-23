import { SocketClientInterface, SocketServerInterface, MessageHandler } from './socket';
import { ProtocolSchema } from '../protocol/schema';

interface SocketHubHandler {
    client:{
        onmessage:MessageHandler['client'];
        sub:<method extends keyof ProtocolSchema>(id:method, handler:MessageHandler['client'][method]) => void;
        notify:<method extends keyof ProtocolSchema>(id:method, data:ProtocolSchema[method]['client']) => void;
        unsub:<method extends keyof ProtocolSchema>(id:method) => void;
    };
    server:{
        onmessage:MessageHandler['server'];
        sub:<method extends keyof ProtocolSchema>(id:method, handler:MessageHandler['server'][method]) => void;
        notify:<method extends keyof ProtocolSchema>(id:method, data:ProtocolSchema[method]['server']) => void;
        unsub:<method extends keyof ProtocolSchema>(id:method) => void;
    };
}

class SocketHub {
    public client:SocketHubHandler['client'];
    public server:SocketHubHandler['server'];

    constructor () {
        this.client = this._initHandler('client');
        this.server = this._initHandler('server');
    }

    private _initHandler<Target extends 'client'|'server'> (target:Target) : SocketHubHandler[Target] {
        return {
            onmessage: {} as any,
            sub: (id, handler) => {
                this[target].onmessage[id] = handler;
            },
            notify: (id, data) => {
                this[target].onmessage[id](id, data);
            },
            unsub: (id) => {
                this[target].onmessage[id] = () => {};
            },
        };
    }
}

export class ClientSocket implements SocketClientInterface {
    public hub:SocketHub;

    constructor (hub:SocketHub) {
        this.hub = hub;
    }

    public send<method extends keyof ProtocolSchema> (id:method, data:ProtocolSchema[method]['server']) {
        this.hub.server.notify(id, data);
    }

    public sub<method extends keyof ProtocolSchema> (id:method, handler:MessageHandler['client'][method]) {
        this.hub.client.sub(id, handler);
    }

    public unsub<method extends keyof ProtocolSchema> (id:method) {
        this.hub.client.unsub(id);
    }
}

export class ServerSocket implements SocketServerInterface {
    public hub:SocketHub;

    constructor (hub:SocketHub) {
        this.hub = hub;
    }

    public send<method extends keyof ProtocolSchema> (id:method, data:ProtocolSchema[method]['client']) {
        this.hub.client.notify(id, data);
    }

    public sub<method extends keyof ProtocolSchema> (id:method, handler:MessageHandler['server'][method]) {
        this.hub.server.sub(id, handler);
    }

    public unsub<method extends keyof ProtocolSchema> (id:method) {
        this.hub.server.unsub(id);
    }
}