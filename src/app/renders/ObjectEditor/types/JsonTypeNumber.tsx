import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";

export default class JsonTypeNumber implements JsonType {
    checkType(value: object): boolean {
        return _.isNumber(value);
    }

    render(value: object, suffix: ReactNode, prefix: ReactNode ,onChange: OnChange) {
        return <span>
            {prefix}
            <span className='json-type-number'>{value}</span>
            {suffix}
        </span>;
    }
}