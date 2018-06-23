import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Container } from './components/container';
import { ClientState } from './client/state';
import { SocketClientInterface } from './socket/socket';

export = function (socket:SocketClientInterface) {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const state = new ClientState();

    ReactDOM.render(<Container state={state} />, root);
};