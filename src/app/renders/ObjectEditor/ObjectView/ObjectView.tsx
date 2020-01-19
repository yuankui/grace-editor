import React from "react";

export interface ViewProps {
    /**
     * 传入值
     */
    value: any,

    /**
     * 传出值
     * @param value
     */
    onChange(value: any): void,

    /**
     * 如果解析错误，就报错
     * @param error
     */
    onError(error: string): void,
}

export abstract class ObjectView<T> extends React.Component<ViewProps, T> {

    protected constructor(props: Readonly<ViewProps>) {
        super(props);
    }

    abstract render();
}