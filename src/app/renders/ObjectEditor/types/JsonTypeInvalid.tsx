import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";

export default class JsonTypeInvalid implements JsonType {
    checkType(value: object): boolean {
        return true;
    }

    render(value: object, suffix: ReactNode, prefix: ReactNode ,onChange: OnChange) {
        return <span>
            {prefix}
            <span className='json-type-string'>"Invalid: {value}"</span>
            {suffix}
        </span>;
    }
}