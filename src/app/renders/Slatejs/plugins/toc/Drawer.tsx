import React from "react";

interface Props {
    show: boolean,
    width: number,
    className?: string,
}

export default class Drawer extends React.Component<Props> {
    render() {
        const width = this.props.show? this.props.width : 0;

        const className = this.props.className ? this.props.className : '';
        return <div style={{width: width}} className={className}>
            {this.props.children}
        </div>;
    }
}