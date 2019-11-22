import React from "react";
import {Tooltip} from "antd";

interface Props {
    onClick?: (e) => void,
    hint?: string,
}

export const HintLink: React.FC<Props> = props => {
    return <Tooltip title={props.hint}>
        <a onClick={props.onClick}>
            {props.children}
        </a>
    </Tooltip>
};