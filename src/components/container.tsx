import * as React from 'react';
import { ClientState, Page } from '../client/state';
import { PageRecord } from './pages/record';

interface ContainerProps {
    state:ClientState;
}

interface ContainerState {

}

export class Container extends React.Component<ContainerProps, ContainerState> {

    public render () {
        const { state } = this.props;
        switch (state.page) {
            case Page.RECORD:
                return <PageRecord state={state} />;
            case Page.TRANSATION:
                return <div></div>;
            case Page.SETTING:
                return <div></div>;
        }
    }
}