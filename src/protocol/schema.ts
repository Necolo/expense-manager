export enum CurrencyEnum {
    CNY,
    USD,
    JPY,
    HKD,
}

export enum Protocol {
    expense,
    findTag,
    setDeviceUser,
    length,
}

export interface ProtocolSchema {
    expense:{
        server:{
            value:number;
            currency:CurrencyEnum;
            device:string;
            tag:string[]|string;
            time:number;
            location:string;
            inputs:string;
        };
        client:{
            ok:boolean;
        };
    };
    findTag:{
        server:{
            device:string;
            inputs:string;
        };
        client:{
            ok:boolean;
            tag:string;
        };
    };
    setDeviceUser:{
        server:{
            device:string;
            username:string;
        };
        client:{
            ok:boolean;
        };
    };
}

export type ProtocolMethod = keyof ProtocolSchema;