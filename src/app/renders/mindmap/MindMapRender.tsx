import React, {FunctionComponent, useState} from 'react';
import {RenderProps} from "../renders";
import MindMap from "./MindMap";
import {Value} from "./model";
import {lazyExecute} from "../../../utils/lazyExecute";

const defaultValue: Value = {
    roots: [
        {
            id: '1',
            text: '未命名',
        }
    ],
    pos: []
};

const MindMapRender: FunctionComponent<RenderProps> = (props) => {
    const {
        onChange,
        value,
        readOnly,
    } = props;

    const [state, setState] = useState(value || defaultValue);

    const save = (value: any) => {
        setState(value);
        onChange(value);
    }
    const lazySave = lazyExecute(save, 500);
    return <MindMap value={state} onChange={lazySave}/>;
};

export default MindMapRender;
