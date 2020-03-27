import React from "react";
import {AppStore} from "../../redux/store";
import {Dispatch} from "redux";

export interface RenderProps {
    state: AppStore,
    dispatch: Dispatch<any>
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
