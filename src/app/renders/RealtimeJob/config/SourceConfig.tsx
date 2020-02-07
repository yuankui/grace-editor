import React, {FunctionComponent} from 'react';
import {Source} from "../Models";
import {Input, InputNumber, Select} from "antd";
import FormItem from "../components/FormItem";
import Collapse from "../components/Collapse";
import {SourceMap} from "./source/Factory";
import {If} from "../../../../utils";
import {changeValue} from "../utils";

interface Props {
    value: Source,
    onChange: (v: Source)=> void,
}

const SourceConfig: FunctionComponent<Props> = (props) => {
    const Com = SourceMap[props.value.type];
    const onChange = changeValue(props.value, props.onChange);

    const {
        type,
        sourceId,
        config,
        name
    } = props.value;
    return <>
        <Collapse title={`${sourceId} -> ${name} -> ${type}`}>
            <FormItem label={'sourceId'}>
                <InputNumber value={sourceId} onChange={onChange('sourceId')}/>
            </FormItem>
            <FormItem label={'name'}>
                <Input value={name} onChange={e => onChange('name')(e.target.value)}/>
            </FormItem>
            <FormItem label={'type'}>
                <Select value={type} onChange={onChange('type')}>
                    <Select.Option value='kafka-auth'>
                        kafka-auth
                    </Select.Option>
                </Select>
            </FormItem>
            <If test={Com != null}>
                <FormItem label={"config"}>
                    <Com value={config} onChange={onChange("config")}/>
                </FormItem>
            </If>
        </Collapse>
    </>
};

export default SourceConfig;
