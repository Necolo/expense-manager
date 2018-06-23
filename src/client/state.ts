export enum Route {
    RECORD,
    SETTING,
    TRANSATION,
    BUDGET,
    STATISTICS,
    TRAVEL,
}

export class ClientState {
    public route:Route = Route.RECORD;

    constructor () {

    }
}