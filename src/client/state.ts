export enum Page {
    RECORD,
    SETTING,
    TRANSATION,
    BUDGET,
    STATISTICS,
    TRAVEL,
}

export class ClientState {
    public page:Page = Page.RECORD;

    constructor () {

    }
}