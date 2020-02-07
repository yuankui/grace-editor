
import React, {FC, ReactNode} from "react";
import {Collapse as ACollapse} from 'antd';

interface Props {
    title: ReactNode,
    className?: string,
    headerClass?: string,
}

export const Collapse: FC<Props> = props => {
    return <ACollapse bordered={false} defaultActiveKey={1} className={props.className}>
        <ACollapse.Panel prefixCls={props.headerClass} showArrow={false} header={props.title}
                         key={1}>
            {props.children}
        </ACollapse.Panel>
    </ACollapse>;
};