import _ from "lodash";
import JsonType from "./JsonType";
import React from "react";
import TypeFactory from "./TypeFactory";
import JsonKey from "./JsonKey";
import Suffix from "./JsonSuffix";

export default class JsonTypeObject extends JsonType {
    checkType(value: object): boolean {
        return _.isPlainObject(value);
    }

    render() {
        const {value, suffix, prefix, onChange} = this.props;
        const entries = Object.entries(value)
            .map((entry, index, array) => {
                const [key, v] = entry;
                const last = index == array.length - 1;

                const suffix = last ? <Suffix/>: null;
                const JsonType = TypeFactory(v);
                const keyNode = <JsonKey value={key}/>;

                return <div key={key} className='json-type-kv'>
                    <JsonType value={v} suffix={suffix} prefix={keyNode} onChange={(newValue) => {
                        const newV = {...value, [key]: newValue};
                        onChange(newV);
                    }}/>
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