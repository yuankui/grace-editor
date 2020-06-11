import React, {FunctionComponent, useContext, useEffect, useMemo, useState} from 'react';
import {Observable} from 'rxjs';
import {sample} from "rxjs/operators";
import mitt from 'mitt';

export interface DndState {
    /**
     * 源元素的对象表示，比如一个article列表的一项就可以用这个列表代表的Article对象表示
     */
    src: any,

    /**
     * 是否在移动
     */
    moving: boolean,

    /**
     * 开始移动的点
     */
    startPoint?: Point,
}

export interface DndContext {
    value: DndState,
    onChange: React.Dispatch<React.SetStateAction<DndState>>,
    moveEvent: mitt.Emitter,
    upEvent: mitt.Emitter,
}

export interface DropEvent {
    outPoint: Point,
    src: any,
}

interface Point {
    x: number,
    y: number,
}

const Context = React.createContext<DndContext>(null as any);

export function useDndContext() {
    return useContext(Context);
}

interface Props {}

export const DndContextProvider: FunctionComponent<Props> = (props) => {
    const [value, onChange] = useState<DndState>({
        moving: false,
        src: null,
    });

    // TODO 重构move逻辑
    const [inputMoveEvent, outputMoveEvent] = useMemo(() => {
        const input = mitt();
        const output = mitt();
        new Observable(subscriber => {
            input.on('move', event => {
                subscriber.next(event);
            })
        })
            .pipe(
                sample(new Observable<any>(subscriber => {
                    const tick = () => {
                        subscriber.next(0);
                        window.requestAnimationFrame(tick);
                    }
                    tick();
                }))
            )
            .subscribe(e => {
                output.emit('move', e);
            })
        return [input, output];
    }, []);

    const upEvent = useMemo(() => {
        return mitt();
    }, []);

    const moving = value.moving;
    useEffect(() => {
        const movingListener = (e: MouseEvent) => {
            if (!moving) {
                return;
            }

            inputMoveEvent.emit('move', {
                x: e.clientX,
                y: e.clientY,
            });

            e.preventDefault();
            e.stopPropagation();
        };

        const mouseUpListener = (e: MouseEvent) => {
            if (!moving) {
                return;
            }
            console.log('node up');

            onChange(prev => {

                upEvent.emit('up', {
                    outPoint: {
                        x: e.clientX,
                        y: e.clientY,
                    },
                    src: prev.src,
                } as DropEvent);
                return {
                    ...prev,
                    moving: false,
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
    }, [moving]);

    return <Context.Provider value={{
        value,
        moveEvent: outputMoveEvent,
        onChange,
        upEvent,
    }}>
        {props.children}
    </Context.Provider>;
};
