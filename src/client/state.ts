export enum RouteEnum {
    RECORD,
    SETTING,
    TRANSATION,
    BUDGET,
    STATISTICS,
    TRAVEL,
}

export class ClientState {
    public route:RouteEnum = RouteEnum.RECORD;

    constructor () {

    }
}