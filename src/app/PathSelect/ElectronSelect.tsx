import React from "react";

let electron;
if (!window.require) {
    electron = {};
} else {
    electron = window.require('electron').remote;
}

interface Props {
    onChoose: (string) => void,
}

export default class ElectronSelect extends React.Component<Props> {
    render() {
        return <div>
            <button type="button" onClick={() => {
                electron.dialog.showOpenDialog({properties: ['openDirectory']})
                    .then(value => {
                        if (!value.canceled && value.filePaths != undefined) {
                            this.props.onChoose(value.filePaths[0])
                        }
                    })
            }}>
                {this.props.children}
            </button>
        </div>
    }
}