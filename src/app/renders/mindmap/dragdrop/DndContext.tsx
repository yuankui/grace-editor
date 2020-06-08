import {FunctionComponent, useContext, useEffect, useMemo, useState} from 'react';
import React from "react";
import {EMPTY, Observable} from 'rxjs';
import {first, flatMap, last, map, sample, sampleTime, window, windowTime} from "rxjs/operators";
import {interval} from "rxjs";
import mitt from 'mitt';
import {fromArray} from "rxjs/internal/observable/fromArray";

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
                sampleTime(1000/60),
            )
            .subscribe(change => {
                console.log(1);
                onChange(change as any);
            })
    }, []);
    return <Context.Provider value={{
        value,
        onChange: change,
    }}>
        {props.children}
    </Context.Provider>;
};
