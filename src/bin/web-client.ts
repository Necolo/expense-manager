import { ClientSocket } from '../socket/client-net';
import createClient = require('../client');

const clientSocket = new ClientSocket(() => {
    createClient(clientSocket);
});
