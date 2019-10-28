import React from "react";
import ElectronSelect from "./ElectronSelect";
import BrowserSelect from "./BrowserSelect";

interface Props {
    onChoose: (string) => void,
}

export default class PathSelect extends React.Component<Props> {
    render() {
        if (window.require) {
            return <ElectronSelect onChoose={this.props.onChoose}>
                {this.props.children}
            </ElectronSelect>
        } else {
            return <BrowserSelect onChoose={this.props.onChoose}>
                {this.props.children}
            </BrowserSelect>
        }
    }
}