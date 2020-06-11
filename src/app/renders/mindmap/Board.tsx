import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react';
import {useDndContext} from "./dragdrop/DndContext";
import {BoardContextProvider} from "./BoardContext";
import {Point} from "./model/Point";
import {useMindMapContext} from "./context/MindMapContext";

interface Props {
    width: number,
    height: number,
    onClick?: () => void,
}

const Board: FunctionComponent<Props> = (props) => {
    const {eventBus} = useMindMapContext();
    const [move, setMove] = useState({
        moving: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
    })

    const [scaleOrigin, setScaleOrigin] = useState({
        scale: 1,
        origin: {
            x: 0,
            y: 0,
        }
    });

    const reset = useCallback(() => {
        setScaleOrigin(prev => {
            return {
                ...prev,
                scale: 1,
            }
        })
    }, []);

    const svgRef = useRef<SVGSVGElement>(null);

    const {moving, startX, startY, currentX, currentY} = move;
    const {scale, origin} = scaleOrigin;

    const outerToInner = useCallback((point: Point) => {
        const svg = svgRef.current;
        if (!svg) return point;

        const rect = svg.getClientRects().item(0) as DOMRect;

        return {
            x: (point.x - rect.left) * scale + origin.x,
            y: (point.y - rect.top) * scale + origin.y,
        } as Point;
    }, [origin.x, origin.y]);


    const dndContext = useDndContext();

    useEffect(() => {

        const onMove = (e: MouseEvent) => {
            if (!moving) {
                return;
            }

            if (dndContext.value.moving) {
                return;
            }

            setMove(prev => {
                return {
                    ...prev,
                    currentX: e.clientX,
                    currentY: e.clientY,
                }
            });
        };
        const onMouseUp = (e: MouseEvent) => {
            console.log('svg up');

            if (!moving) {
                return;
            }

            if (dndContext.value.moving) {
                return;
            }

            setMove(prev => {

                setScaleOrigin(p => {
                    console.log('origin', {
                        x: p.origin.x - (e.clientX - prev.startX) * p.scale,
                        y: p.origin.y - (e.clientY - prev.startY) * p.scale,
                    });
                    return {
                        ...p,
                        origin: {
                            x: p.origin.x - (e.clientX - prev.startX) * p.scale,
                            y: p.origin.y - (e.clientY - prev.startY) * p.scale,
                        }
                    }
                })
                return {
                    ...prev,
                    moving: false,
                }
            })
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }, [moving, dndContext.value.moving]);


    console.log({
        currentX,
        currentY,
        startX,
        startY,
        scale,
    })
    const movedOrigin = !moving ? origin : {
        x: origin.x - (currentX - startX) * scale,
        y: origin.y - (currentY - startY) * scale,
    }
    return <BoardContextProvider value={{
        origin: movedOrigin,
        scale,
        reset,
        outerToInner,
    }}>
        <svg
            onClick={e => {
                e.stopPropagation();
                eventBus.emit('BoardClick');
            }}
            ref={svgRef}
            onWheel={e => {
                if (e.deltaY > 0) {
                    setScaleOrigin(prev => {
                        if (prev.scale < 4) {
                            return {
                                ...prev,
                                scale: prev.scale * 1.1
                            }
                        } else {
                            return prev;
                        }
                    });
                } else {
                    setScaleOrigin(prev => {
                        if (prev.scale > 0.2) {
                            return {
                                ...prev,
                                scale: prev.scale / 1.1
                            }
                        } else {
                            return prev;
                        }
                    });
                }
            }}

            onMouseDown={e => {
                setMove({
                    moving: true,
                    currentX: e.clientX,
                    currentY: e.clientY,
                    startX: e.clientX,
                    startY: e.clientY,
                })
            }}
            width={props.width}
            height={props.height}
            className='board'
            viewBox={`${movedOrigin.x} ${movedOrigin.y} ${props.width * scale} ${props.height * scale}`}>
            {props.children}
        </svg>
    </BoardContextProvider>
};

export default Board;
