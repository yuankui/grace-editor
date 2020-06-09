import React, {useMemo} from 'react';
import {useDndContext} from "./DndContext";
import {HitTest} from "../node/NodeContext";


export function useDrag(src: any): React.MouseEventHandler<SVGElement> {
    const {onChange, moveEvent} = useDndContext();

    return useMemo<React.MouseEventHandler<SVGElement>>(() => {
        return (e: React.MouseEvent) => {
            console.log("node down");
            e.stopPropagation();
            e.preventDefault();
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
    }, []);
}

export function useDragMove() {
    const dndContext = useDndContext();
    return dndContext.value;
}

export function useDrop(hitTest: HitTest, onDrop: () => void) {
    const dragMove = useDragMove();
}