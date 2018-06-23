import ip = require('ip');
import * as Koa from 'koa';
import * as route from 'koa-route';

import { logger } from './server/logger';
import { ServerSocket } from './socket/server-net';
import createAppServer = require('./server');

const app = new Koa();
const PORT = 3000;

app.use(logger);
app.use(route.get('/', (ctx) => {
    ctx.body = 'hello world';
}));

app.on('error', (err, ctx) => {{
    console.error('server error', err);
});

const server = app.listen(PORT);

const serverSocket = new ServerSocket(server);
createAppServer(serverSocket);

console.log(`listening on: http://${ip.address()}:${PORT}`);

/*
ref: http://www.ruanyifeng.com/blog/2017/08/koa.html

const main = async function (ctx, next) {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
};

const main = function(ctx) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);
  ctx.response.body = n + ' views';
}
*/
