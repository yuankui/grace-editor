import {Collapse} from "../../../post/Collapse";
import React from "react";

interface Props {
    title: string,
}

export const SiderGroup: React.FC<Props> = props => {
    return <Collapse className={'app-side-group'} title={<span className='app-side-group-title'>{props.title}</span>}>
        {props.children}
    </Collapse>
};