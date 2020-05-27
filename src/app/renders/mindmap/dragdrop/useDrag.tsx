import React, {useEffect, useMemo, useState} from 'react';

interface Point {
    x: number,
    y: number,
}

interface Ref {
    (element: SVGElement): void,
}
interface DragState {
    moving: boolean,
    startPoint?: Point,
    currentPoint?: Point,
}


export function useDrag(): [Ref, DragState] {
    const [state, setState] = useState<DragState>({
        moving: false,
    });

    const ref = useMemo<Ref>(() => {
        return (element: SVGElement) => {
            element.addEventListener('mousedown', e => {
                setState({
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
            if (!state.moving) {
                return;
            }
            setState(prev => {
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
            if (!state.moving) {
                return;
            }

            setState(prev => {
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
    }, [state.moving]);

    return [ref, state];
}

export function useDrop() {

}