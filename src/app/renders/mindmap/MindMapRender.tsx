import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import {RenderProps} from "../renders";
import MindMap from "./MindMap";
import {Value} from "./model";
import {lazyExecute} from "../../../utils/lazyExecute";
import {createEmptyNode} from "./createEmptyNode";

const defaultValue: Value = {
    roots: [
        createEmptyNode(),
    ],
    pos: [],
    scale: 1,
    origin: {
        x: 500,
        y: 250,
    }
};

const MindMapRender: FunctionComponent<RenderProps> = (props) => {
    const {
        onChange,
        value,
        readOnly,
    } = props;

    const [state, setState] = useState<Value>(value || defaultValue);

    const lazySave = useMemo(() => {
        const lazySave = lazyExecute(onChange, 500);
        return (value: Value) => {
            setState(value);
            lazySave(value);
        };
    }, [])


    return <MindMap value={state}
                    height={'100%'}
                    width={'100%'}
                    onChange={lazySave}/>;
};

export default MindMapRender;
