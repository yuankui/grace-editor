import _ from "lodash";
import JsonType from "./JsonType";
import React from "react";
import Text from "./Text";

interface State {
    showModal: boolean,
}

export default class JsonTypeString extends JsonType<State> {
    checkType(value: object): boolean {
        return _.isString(value);
    }

    render() {
        const {value, suffix, prefix, onChange} = this.props;
        return <span>
            {prefix}
            <Text text={value.toString()} onChange={v => {
                onChange(v);
            }}/>
            {suffix}
        </span>;
    }
}