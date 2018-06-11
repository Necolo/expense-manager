import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Container } from './components/main';
import { ClientState } from './state/client';

const root = document.createElement('div');
document.body.appendChild(root);

const state = new ClientState();

ReactDOM.render(<Container state={state} />, root);