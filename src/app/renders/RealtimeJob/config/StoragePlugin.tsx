import React, {ReactNode} from 'react';
import {InputNumber, Select} from "antd";
import {Value} from "../Value";
import {Storage} from "../Models";
import {changeValue} from "../utils";
import Collapse from "../components/Collapse";
import FormItem from "../components/FormItem";
import {SourceMap} from "./source/Factory";
import JsonPlugin from "./source/JsonPlugin";

interface Props extends Value<Storage>{
    deleteButton: ReactNode,
}

function StoragePlugin(props: Props) {
    const onChange = changeValue(props.value, props.onChange);

    console.log('storage', props.value);

    const {
        config,
        id,
        dimId,
        parallelism,
        type,
    } = props.value;
    const Plugin = (SourceMap[type] || JsonPlugin) as any;

    const title = Plugin.toTitle? Plugin.toTitle(config) : JSON.stringify(config);
    return <>
        <Collapse title={title}
                  actions={props.deleteButton}
        >
            <FormItem label={'id'}>
                <InputNumber value={id} onChange={onChange('id')}/>
            </FormItem>
            <FormItem label={'dimId'}>
                <InputNumber value={dimId} onChange={onChange('dimId')}/>
            </FormItem>
            <FormItem label={'并发'}>
                <InputNumber value={parallelism} onChange={onChange('parallelism')}/>
            </FormItem>
            <FormItem label={"配置"}>
                <Select value={type} onChange={onChange('type')}>
                    <Select.Option key={1} value='squirrel'>
                        squirrel
                    </Select.Option>
                    <Select.Option key={2} value='tair'>
                        tair
                    </Select.Option>
                    <Select.Option key={2} value='kafka'>
                        kafka
                    </Select.Option>
                </Select>
                <JsonPlugin value={config} onChange={onChange('config')}/>
            </FormItem>
        </Collapse>
    </>
}

export default StoragePlugin;
