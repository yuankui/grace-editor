import React, {FC, ReactNode} from "react";
import {Collapse as ACollapse} from 'antd';

interface Props {
    title: ReactNode,
    visible: boolean,
    className?: string,
    headerClass?: string,
}

export const Collapse: FC<Props> = props => {
    return <ACollapse bordered={false} activeKey={1} className={props.className}>
        <ACollapse.Panel prefixCls={props.headerClass} showArrow={false} header={props.title}
                         key={props.visible ? 1 : 0}>
            {props.children}
        </ACollapse.Panel>
    </ACollapse>;
};