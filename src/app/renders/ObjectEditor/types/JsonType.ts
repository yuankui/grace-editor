import React, {ReactNode} from "react";

export interface OnChange {
    (value: object): void;
}

export interface JsonTypeProps {
    value: object,
    suffix: ReactNode,
    prefix: ReactNode,
    onChange: OnChange,
}

export default abstract class JsonType extends React.Component<JsonTypeProps, any>{
    abstract checkType(value: object): boolean;
}