import React, {useMemo} from 'react';
import {useDndContext} from "./DndContext";


export function useDrag(src: any): React.MouseEventHandler<Element> {
    const {onChange, moveEvent} = useDndContext();

    return useMemo<React.MouseEventHandler<Element>>(() => {
        return (e: React.MouseEvent) => {
            console.log("node down");
            e.stopPropagation();
            e.preventDefault();
            console.log("drag start, src:", src);

            onChange({
                src,
                moving: true,
                startPoint: {
                    x: e.clientX,
                    y: e.clientY
                },
            })
            moveEvent.emit('move', {
                x: e.clientX,
                y: e.clientY,
            })
        };
    }, [src]);
}

export function useDragMove() {
    const dndContext = useDndContext();
    return dndContext.value;
}