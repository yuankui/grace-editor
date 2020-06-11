import {Point} from "./model/Point";
import React, {useContext} from 'react';
export interface BoardContext {
    scale: number,
    origin: Point,
    outerToInner: (Point) => Point,
    reset: () => void,
}

const Context = React.createContext<BoardContext>(null as any);
export const BoardContextProvider = Context.Provider;

export function useBoardContext() {
    return useContext(Context);
}