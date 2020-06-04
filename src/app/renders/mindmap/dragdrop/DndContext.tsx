import {FunctionComponent, useContext, useState} from 'react';
import React from "react";

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

export const DndContextProvider: FunctionComponent<Props> = (props) => {
    const [value, onChange] = useState<DndState>({
        moving: false,
        src: null,
    });
    return <Context.Provider value={{
        value,
        onChange,
    }}>
        {props.children}
    </Context.Provider>;
};
