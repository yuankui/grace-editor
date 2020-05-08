import {Collapse} from "../../../post/Collapse";
import React, {ReactNode} from "react";

interface Props {
    title: ReactNode,
    action?: ReactNode,
}

export const SiderGroup: React.FC<Props> = props => {
    return <Collapse className={'app-side-group'} title={<div className='app-side-group-title'>
        <div className='title'>{props.title}</div>
        <div className='action'>{props.action}</div>
    </div>}>
        {props.children}
    </Collapse>
};