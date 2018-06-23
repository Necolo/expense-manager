import * as React from 'react';
import { ClientState, Route } from '../client/state';
import { Record } from './record';

interface ContainerProps {
    state:ClientState;
}

interface ContainerState {

}

export class Container extends React.Component<ContainerProps, ContainerState> {

    public render () {
        const { state } = this.props;
        switch (state.route) {
            case Route.RECORD:
                return <Record state={state} />;
            case Route.TRANSATION:
                return <div></div>;
            case Route.SETTING:
                return <div></div>;
        }
    }
}