import React, {ReactNode} from "react";

export interface OnChange {
    (value: any): void;
}

export interface JsonTypeProps {
    value: object,
    suffix: ReactNode,
    prefix: ReactNode,
    onChange: OnChange,
}

export default abstract class JsonType<S = any> extends React.Component<JsonTypeProps, S>{
    abstract checkType(value: object): boolean;
}