import _ from "lodash";
import JsonType, {JsonTypeProps} from "./JsonType";
import React from "react";
import TypeFactory from "./TypeFactory";
import JsonKey from "./JsonKey";
import Suffix from "./JsonSuffix";
import {If} from "../../../../../../utils";
import {Icon} from "antd";

interface State {
    visible: boolean,
}
export default class JsonTypeObject extends JsonType<State> {


    constructor(props: JsonTypeProps, context: any) {
        super(props, context);
        this.state = {
            visible: true,
        }
    }

    checkType(value: object): boolean {
        return _.isPlainObject(value);
    }

    render() {
        const {value, suffix, prefix, onChange} = this.props;
        const entries = Object.entries(value)
            .map((entry, index, array) => {
                const [key, v] = entry;
                const last = index == array.length - 1;

                const suffix = !last ? <Suffix/>: null;
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
                {"{ "}
                <a className={'expand-' + this.state.visible} onClick={() => {
                    this.setState({
                        visible: !this.state.visible,
                    })
                }}>
                    <If test={this.state.visible}>
                        <Icon type="minus-circle" />
                    </If>
                    <If test={!this.state.visible}>
                        <Icon type="plus-circle" />
                    </If>
                </a>
                <If test={!this.state.visible}>
                    {" }"}
                </If>
            </div>

            <If test={this.state.visible}>
                {entries}
                <div>{"}"}{suffix}</div>
            </If>
        </div>;
    }
}