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
    // TODO add origin
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
        return (value: any) => {
            setState(value);
            lazySave(value);
        };
    }, [])

    const ref = useRef<HTMLDivElement>(null);

    const [[width, height], setSvgSize] = useState([1000, 500]);

    // 定期同步svg尺寸
    useEffect(() => {
        const syncWidth = () => {
            if (ref.current) {
                const {clientWidth, clientHeight} = ref.current;
                if (width != clientWidth || height != clientHeight) {
                    setSvgSize([width, height]);
                }
            }
        }
        syncWidth();
        const h = setInterval(syncWidth, 50);
        return () => clearInterval(h);
    }, [width, height])

    return <div ref={ref}>
        <MindMap value={state}
                 scale={state.scale}
                 height={height}
                 width={width}
                 onChange={lazySave}/>
    </div>;
};

export default MindMapRender;
