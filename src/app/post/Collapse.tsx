import React, {ReactNode} from "react";
import {Collapse as ACollapse} from 'antd';

interface Props {
    title: ReactNode,
}

interface State {
}

export default class Collapse extends React.Component<Props, State> {
    render() {
        return <ACollapse defaultActiveKey={1}>
            <ACollapse.Panel showArrow={false} header={this.props.title} key="1">
                {this.props.children}
            </ACollapse.Panel>
        </ACollapse>;
    }
}