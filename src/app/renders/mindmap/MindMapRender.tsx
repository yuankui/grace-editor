import React, {FunctionComponent, useEffect, useState} from 'react';
import {RenderProps} from "../renders";
import MindMap from "./MindMap";
import {Value} from "./model";
import {createEmptyNode} from "./createEmptyNode";
import {useSampleQueue} from "./sampleQueue/useSampleQueue";

const defaultValue: Value = {
    roots: [
        createEmptyNode(),
    ],
    scale: 1,
    origin: {
        x: -200,
        y: -80,
    }
};

const MindMapRender: FunctionComponent<RenderProps> = (props) => {
    const {
        onChange,
        value,
        readOnly,
    } = props;

    const [state, setState] = useState<Value>(value || defaultValue);

    const [valueInput, valueOutput] = useSampleQueue(500);

    useEffect(() => {
        valueOutput.on(message => {
            onChange(message);
        })
    }, []);

    return <MindMap value={state}
                    height={'98%'}
                    width={'98%'}
                    onChange={mapper => {
                        setState(old => {
                            const newV = mapper(old);
                            valueInput.emit(newV);
                            return newV;
                        })
                    }}/>;
};

export default MindMapRender;
