import _ from "lodash";
import JsonType, {OnChange} from "./JsonType";
import React, {ReactNode} from "react";
import {Popover, message, Modal} from "antd";

const {clipboard} = require('electron');

export default class JsonTypeString implements JsonType {
    checkType(value: object): boolean {
        return _.isString(value);
    }

    render(value: object, suffix: ReactNode, prefix: ReactNode, onChange: OnChange) {
        const actions = <div>
            <a onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                clipboard.writeText(value.toString());
                message.info("copy success");
            }}>复制</a>

            <span> | </span>
            <a>编辑</a>
        </div>;
        return <span>
            {prefix}
            <Popover content={actions} trigger={"click"} placement={'top'}>
                <a className='json-type-string'>"{value}"</a>
            </Popover>
            {suffix}
        </span>;
    }
}