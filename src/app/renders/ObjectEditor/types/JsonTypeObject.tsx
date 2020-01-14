import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";
import TypeFactory from "./TypeFactory";
import JsonKey from "./JsonKey";
import Suffix from "./JsonSuffix";

export default class JsonTypeObject implements JsonType {
    checkType(value: object): boolean {
        return _.isPlainObject(value);
    }

    render(value: object, suffix: ReactNode, prefix: ReactNode ,onChange: OnChange) {
        const entries = Object.entries(value)
            .map((entry, index, array) => {
                const [key, value] = entry;
                const last = index == array.length - 1;

                const suffix = last ? <Suffix/>: null;
                const jsonType = TypeFactory(value);
                const keyNode = <JsonKey value={key}/>;

                return <div className='json-type-kv'>
                    {jsonType.render(value, suffix, keyNode, () => {})}
                </div>;
            });

        return <div className='json-type-object'>
            <div>
                {prefix}
                {"{"}
            </div>
            {entries}
            <div>{"}"}{suffix}</div>
        </div>;
    }
}