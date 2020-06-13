import React, {FunctionComponent, useEffect, useState} from 'react';
import {useNodeContext} from "./NodeContext";
import {useDndContext} from "../dragdrop/DndContext";
import {useBoardContext} from "../BoardContext";
import {useMindMapContext} from "../context/MindMapContext";

interface Props {
    select: boolean,
}

const NodeSelectBorder: FunctionComponent<Props> = (props) => {
    const {eventBus} = useMindMapContext();
    const {outerToInner} = useBoardContext();
    const nodeContext = useNodeContext();
    const {nodePos, nodeConf, hitTest} = nodeContext;
    const {height, width} = nodeConf;
    const selectWidth = 2;
    const selectColor = '#BDDCFF';

    const select = props.select;
    const borderRadius = 5;

    const [hover, setHover] = useState(false);

    const highlight = select || hover;

    const dndContext = useDndContext();
    const {moveEvent} = dndContext;

    eventBus.useListener('BoardClick', event => {
        setHover(false);
    })
    useEffect(() => {
        const listener = point => {
            point = outerToInner(point);

            if (hitTest(point.x, point.y)) {

                console.log('hit');
                setHover(true)
            } else {
                setHover(false);
            }
        };
        moveEvent.on('move', listener);
        return () => moveEvent.off('move', listener);
    }, [outerToInner]);


    // 选择边框
    const border = <rect x={nodePos.x - selectWidth}
                         y={nodePos.y - height /2 - selectWidth}
                         fill={'transparent'}
                         stroke={highlight ? selectColor : 'rgba(0,0,0,0)'}
                         strokeWidth={selectWidth}
                         width={width + 2 * selectWidth}
                         height={height + 2 * selectWidth}
                         rx={borderRadius + selectWidth}
                         ry={borderRadius + selectWidth}
    />;
    return <>
        {border}
    </>;
};

export default NodeSelectBorder;
