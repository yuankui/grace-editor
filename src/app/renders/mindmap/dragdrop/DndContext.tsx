import React, {FunctionComponent, useContext, useEffect, useMemo, useState} from 'react';
import {Observable} from 'rxjs';
import {sample, sampleTime} from "rxjs/operators";
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

    /**
     * 当前点
     */
    currentPoint?: Point,
}

export interface DndContext {
    value: DndState,
    onChange: React.Dispatch<React.SetStateAction<DndState>>,
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

export const moveEvent = mitt();

export const DndContextProvider: FunctionComponent<Props> = (props) => {
    const [value, onChange] = useState<DndState>({
        moving: false,
        src: null,
    });

    const change = useMemo(() => {
        return (c) => {
            moveEvent.emit('move', c);
        }
    }, []);

    useEffect(() => {
        new Observable(subscriber => {
            moveEvent.on('move', change => {
                subscriber.next(change)
            })
        })
            .pipe(
                sample(new Observable<any>(subscriber => {
                    const tick = () => {
                        subscriber.next(0);
                        window.requestAnimationFrame(tick);
                    }
                    tick();
                })),
            )
            .subscribe(change => {
                console.log(1);
                onChange(change as any);
            })
    }, []);

    const moving = value.moving;
    useEffect(() => {
        const movingListener = (e: MouseEvent) => {
            if (!moving) {
                return;
            }

            console.log('moving node' + value.src.id);
            onChange(prev => {
                return {
                    ...prev,
                    currentPoint: {
                        x: e.clientX,
                        y: e.clientY,
                    }
                }
            })
            e.preventDefault();
            e.stopPropagation();
        };

        const mouseUpListener = (e: MouseEvent) => {
            if (!moving) {
                return;
            }
            console.log('node up');

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
    }, [moving]);

    return <Context.Provider value={{
        value,
        onChange: change,
    }}>
        {props.children}
    </Context.Provider>;
};
