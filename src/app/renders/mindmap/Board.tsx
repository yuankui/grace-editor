import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {useNotifier} from "./hooks/useListener";
import {useDndContext} from "./dragdrop/DndContext";
import {BoardContextProvider} from "./BoardContext";
import {Point} from "./model/Point";

interface Props {
    width: number,
    height: number,
    onClick?: () => void,
}

const Board: FunctionComponent<Props> = (props) => {
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

    const outerToInner = useCallback((point: Point) => {
        return point;
    }, []);


    const {moving, startX, startY, currentX, currentY} = move;
    const {scale, origin} = scaleOrigin;

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
                    return {
                        ...p,
                        origin: {
                            x: p.origin.x - (e.clientX - prev.startX ) * p.scale,
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

    let notifier = useNotifier();

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
                notifier('BoardClick');
            }}

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
