import React, {FunctionComponent, useState} from 'react';
import {classNames} from "../../../../utils";
import Popover from "../../../layout/right/TopBar/actions/popover/Popover";

export interface CornerAction {
    title: string,
    callback(): void,
}

interface Props {
    actions: Array<CornerAction>,
    className?: string,
    title: string,
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
            action.callback();
            setShowPopover(false);
        }}>
            {action.title}
        </a>
    });

    const popupContent = <div className='corner-action-buttons'>
        {actions}
    </div>;

    return <div className={className}>
        <Popover placement={'bottom'}
                 visible={showPopover}
                 onVisibleChange={visible => {
                     setShowPopover(visible);
                 }}
                 content={popupContent}
                 className={'corner-action-container'}>
            {props.title}
        </Popover>
        {props.children}
    </div>;
};

export default Corner;
