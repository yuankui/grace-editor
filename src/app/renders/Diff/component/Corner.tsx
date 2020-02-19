import React, { FunctionComponent } from 'react';
import {classNames} from "../../../../utils";
import Popover from "../../../layout/right/TopBar/actions/popover/Popover";

export interface CornerAction {
    title: string,
    callback(): void,
}

interface Props {
    actions: Array<CornerAction>,
    className: string,
    title: string,
}

const Corner: FunctionComponent<Props> = (props) => {
    const className = classNames([
        'corner-wrapper',
        props.className,
    ]);

    const actions = props.actions.map((action, index) => {
        return <a className={'corner-action'} key={index} onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            action.callback();
        }}>
            {action.title}
        </a>
    });

    const popupContent = <div className={'corner-action-container'}>
        {actions}
    </div>;

    return <div className={className}>
        <Popover placement={'leftBottom'} content={popupContent}>
            {props.title}
        </Popover>
        {props.children}
    </div>;
};

export default Corner;
