import React, {FunctionComponent, ReactNode, useState} from 'react';
import {classNames} from "../../../utils";
import Popover from "../../../app/layout/right/TopBar/actions/popover/Popover";

type Placement = "in" | "out";
type ActionStyle = "show" | "hover";

export interface CornerAction {
    title: ReactNode,
    callback(hide: () => void): void,
}

interface Props {
    actions: Array<CornerAction>,
    className?: string,
    title: ReactNode,
    placement?: Placement,
    actionStyle?: ActionStyle,
    width?: number,
}

const Corner: FunctionComponent<Props> = (props) => {
    const className = classNames([
        'corner-container',
        props.className || '',
    ]);

    const [showPopover, setShowPopover] = useState(false);
    const actions = props.actions.map((action, index) => {
        return <a className={'corner-action'} key={index} onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            action.callback(() => {
                setShowPopover(false);
            });
        }}>
            {action.title}
        </a>
    });

    const popupContent = <div className='corner-action-buttons'>
        {actions}
    </div>;

    const top = props.placement === 'out'? -10 : 0;
    const width = props.width || 'auto';

    return <div className={className}>
        <Popover placement={'leftTop'}
                 visible={showPopover}
                 onVisibleChange={visible => {
                     setShowPopover(visible);
                 }}
                 style={{top}}
                 popoverStyle={{width}}
                 content={popupContent}
                 className={'corner-action-container'}>
            {props.title}
        </Popover>
        {props.children}
    </div>;
};

export default Corner;
