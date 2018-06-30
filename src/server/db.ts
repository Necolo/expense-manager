
export interface DBHandlerInterface {
}

export enum Currency {
    CNY,
    GBP,
    JPY,
    HKD,
    USD,
}

export enum IOType {
    expense,
    income,
}

export enum ScheduleType {
    once,
    weekly,
    monthly,
    yearly,
    daily,
}

export interface LocationTable {
    id:number;
    text:string;
}

export interface RecordBase {
    id:number;
    date:number;
    value:number;
    tags:number[];
    fulltext:string;
    currency:Currency;
    ioType:IOType;
    note:string;
    accountId:number;
}

export interface RecordTable extends RecordBase {
    time:number;
    deviceId:number;
    locationId:number;
    userId:number;
}

export interface TagTable {
    id:number;
    name:string;
    match:string[];
}

export interface WalletTable {
    id:number;
    name:string;
    createDate:number;
    balance:number;
}

export interface CreditTable extends WalletTable {
    billDate:number;
}

export interface AccountTable {
    wallets:WalletTable[];
    credits:CreditTable[];
}

export interface ScheduleTable extends RecordBase {
    type:ScheduleType;
    startDate:number;
    untilDate:number;
}

export interface UserTable {
    id:number;
    name:string;
    devices:number[];
    email:string;
    tags:number[];
    accounts:AccountTable[];
    default_currency:Currency;
    schedules:ScheduleTable[];
}

export interface DeviceTable {
    id:number;
    name:string;
}

export interface DBTable {
    records:RecordTable[];
    users:UserTable[];
    tags:TagTable[];
    devices:DeviceTable[];
}