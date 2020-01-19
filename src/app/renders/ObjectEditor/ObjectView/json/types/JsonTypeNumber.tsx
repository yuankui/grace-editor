import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";

export default class JsonTypeNumber extends JsonType {
    checkType(value: object): boolean {
        return _.isNumber(value);
    }

    render() {
        const {value, suffix, prefix, onChange} = this.props;
        return <span>
            {prefix}
            <span className='json-type-number'>{value}</span>
            {suffix}
        </span>;
    }
}