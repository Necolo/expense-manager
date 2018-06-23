import { ProtocolSchema } from '../protocol/schema';

export interface MessageHandler {
    client:{
        [method in keyof ProtocolSchema]:(id:method, data:ProtocolSchema[method]['client']) => void;
    };
    server:{
        [method in keyof ProtocolSchema]:(id:method, data:ProtocolSchema[method]['server']) => void;
    };
}

export interface SocketClientInterface {
    send:<method extends keyof ProtocolSchema>(id:method, data:ProtocolSchema[method]['server']) => void;
    sub:<method extends keyof ProtocolSchema>(id:method, handler:MessageHandler['client'][method]) => void;
    unsub:<method extends keyof ProtocolSchema>(id:method) => void;
}

export interface SocketServerInterface {
    send:<method extends keyof ProtocolSchema>(id:method, data:ProtocolSchema[method]['client']) => void;
    sub:<method extends keyof ProtocolSchema>(id:method, handler:MessageHandler['server'][method]) => void;
    unsub:<method extends keyof ProtocolSchema>(id:method) => void;
}