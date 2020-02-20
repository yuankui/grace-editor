import React, {CSSProperties, FunctionComponent, ReactNode, useState} from 'react';
import {Popover as Pop} from "antd";
import {classNames} from "../../../../../../utils";

interface OwnProps {
    placement: TooltipPlacement,
    content: ReactNode,
    visible?: boolean,
    title?: ReactNode,
    onVisibleChange?(visible: boolean): void,
    className?: string,
    style?: CSSProperties,
    popoverStyle?: CSSProperties,
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
    const className = classNames([
        props.className || '',
        'grace-popover'
    ]);

    return (<Pop placement={props.placement}
                 className={className}
                 style={props.style}
                 overlayStyle={props.popoverStyle}
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
