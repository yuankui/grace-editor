import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";

export default class JsonTypeBoolean extends JsonType {
    checkType(value: object): boolean {
        return _.isBoolean(value);
    }

    render() {
        const {value, suffix, prefix, onChange} = this.props;
        return <span>
            {prefix}
            <span className='json-type-boolean'>{value.toString()}</span>
            {suffix}
        </span>;
    }
}