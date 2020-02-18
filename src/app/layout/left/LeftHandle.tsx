import React, {FunctionComponent} from 'react';
// import electron from 'electron';

interface Props {}

const electron = window?.require('electron');

export function ToggleMaximize() {
    if (electron) {
        const window = electron.remote.getCurrentWindow();
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    }
}

const LeftHandle: FunctionComponent<Props> = (props) => {
    return <>
        <div className='app-left-handle' onDoubleClick={ToggleMaximize} />
    </>;
};

export default LeftHandle;
