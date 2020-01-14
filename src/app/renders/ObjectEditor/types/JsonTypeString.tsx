import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";

export default class JsonTypeString implements JsonType {
    checkType(value: object): boolean {
        return _.isString(value);
    }

    render(value: object, suffix: ReactNode, prefix: ReactNode ,onChange: OnChange) {
        return <span>
            {prefix}
            <span className='json-type-string'>"{value}"</span>
            {suffix}
        </span>;
    }
}