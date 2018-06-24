import { DBHandlerInterface, DBTable } from '../server/db';
import { SocketHub, ServerSocket, ClientSocket } from '../socket/local';
import createClient = require('../client');
import createServer = require('../server');

class DB {
    public data:{project:{[projecet:string]:DBTable}}; //FIXME:

    private _value:any = null;
    private _should_reset:boolean = false;

    constructor () {
        this.data = {
            project: {
                'default': {
                    categoryList: ['decoration', 'symbol', 'color', 'natural', 'item', 'structural'],
                    voxelSpec: {},
                    id_count: 0,
                },
            },
        };
    }

    public get(msg:string) {
        console.log('get: ', msg);
        const props = msg.split('.');
        this._initValue();
        this._value = this._getValue(props, this.data, 0);
        return this;
    }

    public value() {
        console.log('value: ', this._value);
        this._should_reset = true;
        return this._value;
    }

    public push(obj) {
        console.log('push: ', obj);
        this._initValue();
        this._value.push(obj);
        return this;
    }

    public write() {
        this._should_reset = true;
        return this;
    }

    public set(msg:string, data:any) {
        console.log('set: ', msg, data);
        this._initValue();
        const props = msg.split('.');
        const setValue = props.pop();
        const obj = this._getValue(props, this._value, 0);
        if (setValue) {
            obj[setValue] = data;
        }
        return this;
    }

    public then(cb:() => void) {
        cb();
    }

    private _initValue () {
        if (this._should_reset) {
            this._value = this.data;
            this._should_reset = false;
        }
    }

    private _getValue (props, obj, i) {
        if (i < props.length) {
            return this._getValue(props, obj[props[i]], i + 1);
        } else {
            return obj;
        }
    }
}

export class DBHandler implements DBHandlerInterface {
    public db:any;

    constructor () {
        this.db = new DB();
    }
}

const hub = new SocketHub();
const clientSocket = new ClientSocket(hub);
const serverSocket = new ServerSocket(hub);
createServer(serverSocket, new DBHandler());
createClient(clientSocket);
