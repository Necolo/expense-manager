import { MessageHandler, SocketClientInterface } from './socket';
import { ProtocolSchema } from '../protocol/schema';

export class ClientSocket implements SocketClientInterface {
    private ws:WebSocket;
    private onmessage:MessageHandler['client'] = {} as any;

    constructor () {
        this.ws = new WebSocket(
            `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`,
        );
    }

    public send<method extends keyof ProtocolSchema> (id:method, data:ProtocolSchema[method]['server']) {
        this.ws.send(JSON.stringify({
            id,
            data,
        }));
    }

    public sub<method extends keyof ProtocolSchema> (id:method, handler:MessageHandler['client'][method]) {
        this.onmessage[id] = handler;
    }

    public unsub<method extends keyof ProtocolSchema> (id:method) {
        this.onmessage[id] = () => {};
    }
}