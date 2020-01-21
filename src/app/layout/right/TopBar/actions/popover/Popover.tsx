import React, {FunctionComponent, ReactNode, useState} from 'react';
import {Popover as Pop} from "antd";

interface OwnProps {
    placement: TooltipPlacement,
    content: ReactNode,
    visible?: boolean,
    title?: ReactNode,
    onVisibleChange?(visible: boolean): void,
}

type Props = OwnProps;
export type TooltipPlacement =
    'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';

const Popover: FunctionComponent<Props> = (props) => {
    const [visible, setVisible] = useState(false);
    return (<Pop placement={props.placement}
                 className='grace-popover'
                 overlayClassName='grace-popover'
                 content={props.content}
                 visible={props.visible || visible}
                 title={props.title}
                 getPopupContainer={() => {
                     const el = document.getElementById('app-container');
                     if (el == null) {
                         return document.body;
                     } else {
                         return el;
                     }
                 }}
                 onVisibleChange={props.onVisibleChange || (v => setVisible(v))}
                 trigger="click">
        {props.children}
    </Pop>);
};

export default Popover;
