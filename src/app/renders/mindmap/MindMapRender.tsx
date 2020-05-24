import React, {FunctionComponent, useMemo, useState} from 'react';
import {RenderProps} from "../renders";
import MindMap from "./MindMap";
import {Value} from "./model";
import {lazyExecute} from "../../../utils/lazyExecute";
import {createEmptyNode} from "./createEmptyNode";

const defaultValue: Value = {
    roots: [
        createEmptyNode(),
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

    const lazySave = useMemo(() => {
        const lazySave = lazyExecute(onChange, 500);
        return (value: any) => {
            setState(value);
            lazySave(value);
        };
    }, [])

    return <MindMap value={state} onChange={lazySave}/>;
};

export default MindMapRender;
