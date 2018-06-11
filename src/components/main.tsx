import * as React from 'react';
import { ClientState } from '../state/client';

interface ContainerProps {
    state:ClientState;
}

interface ContainerState {

}

export class Container extends React.Component<ContainerProps, ContainerState> {

    public render () {
        return (
            <div>
            </div>
        );
    }
}