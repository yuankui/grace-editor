import _ from "lodash";
import JsonType from "./JsonType";
import React from "react";
import Suffix from "./JsonSuffix";
import TypeFactory from "./TypeFactory";

export default class JsonTypeArray extends JsonType {
    checkType(value: object): boolean {
        return _.isArray(value);
    }

    render() {
        const {value, suffix, prefix, onChange} = this.props;
        const array: Array<any> = value as Array<any>;
        const entries = array
            .map((v, index) => {
                const last = index == array.length - 1;
                const suffix = last ? null: <Suffix/>;
                const JsonType = TypeFactory(v);

                return <div key={index} className='json-type-array-v'>
                    <JsonType value={v} prefix={null} suffix={suffix} onChange={(change) => {
                        const newV = array.map((value1, index1) => {
                            if (index1 == index) {
                                return change;
                            }
                            return value1;
                        });
                        onChange(newV);
                    }}/>
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