import React from "react";
import {AppStore} from "../../redux/store";

export interface RenderProps {
    state: AppStore,
    value: any,
    onChange: OnChange<any>,
}

export class Render<S = any> extends React.Component<RenderProps, S> {
}

export interface OnChange<T> {
    (value: T): void,
}
