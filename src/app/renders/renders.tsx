import React from "react";

export interface RenderProps {
    value: any,
    onChange: OnChange<any>,
    readOnly?: boolean,
}

export class Render<S = any> extends React.Component<RenderProps, S> {
}

export type FunctionRender = React.FC<RenderProps>;

export interface OnChange<T> {
    (value: T): void,
}
