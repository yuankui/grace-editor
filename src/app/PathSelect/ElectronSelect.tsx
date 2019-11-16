import React from "react";
import {Button, Input} from "antd";

let electron;
if (!window.require) {
    electron = {};
} else {
    electron = window.require('electron').remote;
}

interface Props {
    onChange: (string) => void,
    value: string,
}

export default class ElectronSelect extends React.Component<Props> {
    render() {
        return (
            <div className='app-path-select'>
                <Input value={this.props.value} disabled={true}/>
                <Button onClick={() => {
                    electron.dialog.showOpenDialog({properties: ['openDirectory']})
                        .then(value => {
                            if (!value.canceled && value.filePaths != undefined) {
                                this.props.onChange(value.filePaths[0])
                            }
                        })
                }} icon={'more'}/>
            </div>
        );
    }
}