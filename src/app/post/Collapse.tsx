import React, {ReactNode} from "react";
import {Collapse as ACollapse} from 'antd';

interface Props {
    title: ReactNode,
    visible: boolean,
    className?: string,
    headerClass?: string,
}

interface State {
}

export default class Collapse extends React.Component<Props, State> {
    render() {
        return <ACollapse bordered={false} activeKey={1} className={this.props.className}>
            <ACollapse.Panel prefixCls={this.props.headerClass} showArrow={false} header={this.props.title} key={this.props.visible ? 1 : 0}>
                {this.props.children}
            </ACollapse.Panel>
        </ACollapse>;
    }
}