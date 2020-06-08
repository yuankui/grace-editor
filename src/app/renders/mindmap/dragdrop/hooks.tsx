import React, {useMemo} from 'react';
import {useDndContext} from "./DndContext";


export function useDrag(src: any): React.MouseEventHandler<SVGElement> {
    const {onChange} = useDndContext();

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
                currentPoint: {
                    x: e.clientX,
                    y: e.clientY,
                }
            })
        };
    }, []);
}

export function useDragMove() {
    const dndContext = useDndContext();
    return dndContext.value;
}

export function useDrop() {

}