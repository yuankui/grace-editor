import _ from "lodash";
import JsonType from "./JsonType";
import React from "react";

export default class JsonTypeNull extends JsonType {
    checkType(value: object): boolean {
        return _.isNull(value);
    }

    render() {
        const {value, suffix, prefix, onChange} = this.props;

        return <span>
            {prefix}
            <span className='json-type-null'>null</span>
            {suffix}
        </span>
    }
}