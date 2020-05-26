import React, { FunctionComponent } from 'react';

interface Point {
    x: number,
    y: number,
}

interface DragContext {
    ref: (element: SVGElement) => void,
    moving: boolean,
    startPoint: Point,
    currentPoint: Point,
}


export function useDrag(): DragContext {
    return {} as any;
}

export function useDrop() {

}