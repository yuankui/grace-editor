import React from "react";

export interface RenderProps {
    value: any,
    onChange: OnChange<any>,
}

export class Render<S = any> extends React.Component<RenderProps, S> {
}

export interface OnChange<T> {
    (value: T): void,
}
