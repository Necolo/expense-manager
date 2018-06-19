import * as React from 'react';
import { ClientState, RouteEnum } from '../client/state';
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
            case RouteEnum.RECORD:
                return <Record state={state} />;
            case RouteEnum.TRANSATION:
                return <div></div>;
            case RouteEnum.SETTING:
                return <div></div>;
        }
    }
}