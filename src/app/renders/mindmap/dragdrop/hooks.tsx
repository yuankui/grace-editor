import React, {useEffect, useMemo} from 'react';
import {DndState, useDndContext} from "./DndContext";


interface Ref {
    (element: SVGElement): void,
}

export function useDrag(src: any): [Ref, DndState] {
    const {value: context, onChange} = useDndContext();

    const ref = useMemo<Ref>(() => {
        return (element: SVGElement) => {
            element.addEventListener('mousedown', e => {
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
            });
        }
    }, []);

    useEffect(() => {
        const movingListener = (e: MouseEvent) => {
            if (!context.moving) {
                return;
            }
            onChange(prev => {
                return {
                    ...prev,
                    currentPoint: {
                        x: e.clientX,
                        y: e.clientY,
                    }
                }
            })
        };

        const mouseUpListener = (e: MouseEvent) => {
            if (!context.moving) {
                return;
            }

            onChange(prev => {
                return {
                    ...prev,
                    moving: false,
                    currentPoint: undefined,
                    startPoint: undefined,
                }
            })
        };
        window.addEventListener('mousemove', movingListener);
        window.addEventListener('mouseup', mouseUpListener);

        return () => {
            window.removeEventListener('mousemove', movingListener);
            window.removeEventListener('mouseup', mouseUpListener);
        }
    }, [context.moving]);

    return [ref, context];
}

export function useDragMove() {
    const dndContext = useDndContext();
    return dndContext.value;
}

export function useDrop() {

}