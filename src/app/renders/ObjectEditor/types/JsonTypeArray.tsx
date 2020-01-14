import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";
import Suffix from "./JsonSuffix";
import TypeFactory from "./TypeFactory";

export default class JsonTypeArray implements JsonType {
    checkType(value: object): boolean {
        return _.isArray(value);
    }

    render(value: object, suffix: ReactNode, prefix: ReactNode ,onChange: OnChange) {
        const array: Array<any> = value as Array<any>;
        const entries = array
            .map((value, index) => {
                const last = index == array.length - 1;
                const suffix = last ? null: <Suffix/>;
                const jsonType = TypeFactory(value);

                return <div className='json-type-array-v'>
                    {jsonType.render(value, suffix, null, () => {})}
                </div>;
            });

        return <div className='json-type-array'>
            <div>
                {prefix}
                {"["}
            </div>
            {entries}
            <div>{"]"}{suffix}</div>
        </div>;
    }
}