import {ReactNode} from "react";

export interface OnChange {
    (value: object): void;
}

export default interface JsonType {
    checkType(value: object): boolean;

    /**
     *
     * @param value
     * @param suffix 逗号
     * @param prefix key
     * @param onChange 值变化接收
     */
    render(value: object, suffix: ReactNode, prefix: ReactNode ,onChange: OnChange): ReactNode;
}