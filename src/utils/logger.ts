import * as Koa from 'koa';

export function logger (ctx:Koa.Context, next:() => void) {
    console.log(`${(new Date()).toString()} ${ctx.request.method} ${ctx.request.url}`);
    next();
}