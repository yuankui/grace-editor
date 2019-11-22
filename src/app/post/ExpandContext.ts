import React from "react";

export interface ExpandState {
    value: Array<string>,
    set: (value: Array<string>) => void,
}

export const ExpandContext = React.createContext<ExpandState>({
    value: [],
    set() {},
});