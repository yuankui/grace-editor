import {FunctionComponent, useContext, useState} from 'react';
import React from "react";

export interface DndState {
    src: any,
    moving: boolean,
    startPoint?: Point,
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
