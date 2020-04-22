import JsonType from "./JsonType";
import React from "react";

export default class JsonTypeInvalid extends JsonType {
    checkType(value: object): boolean {
        return true;
    }

    render() {
        const {value, suffix, prefix, onChange} = this.props;

        return <span>
            {prefix}
            <span className='json-type-string'>"Invalid: {value}"</span>
            {suffix}
        </span>;
    }
}