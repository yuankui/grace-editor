import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";

export default class JsonTypeNull implements JsonType {
    checkType(value: object): boolean {
        return _.isNull(value);
    }

    render(value: object, suffix: ReactNode, prefix: ReactNode ,onChange: OnChange) {
        return <span>
            {prefix}
            <span className='json-type-null'>null</span>
            {suffix}
        </span>
    }
}