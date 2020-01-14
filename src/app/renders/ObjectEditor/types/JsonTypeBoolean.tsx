import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";

export default class JsonTypeBoolean implements JsonType {
    checkType(value: object): boolean {
        return _.isBoolean(value);
    }

    render(value: object, suffix: ReactNode, prefix: ReactNode ,onChange: OnChange) {
        return <span>
            {prefix}
            <span className='json-type-boolean'>{value.toString()}</span>
            {suffix}
        </span>;
    }
}