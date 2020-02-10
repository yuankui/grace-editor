import React, {ReactNode} from 'react';
import {InputNumber} from "antd";
import {Value} from "../Value";
import {Storage} from "../Models";
import {changeValue} from "../utils";
import Collapse from "../components/Collapse";
import FormItem from "../components/FormItem";

interface Props extends Value<Storage>{
    deleteButton: ReactNode,
}

function StorageConfig(props: Props) {
    const onChange = changeValue(props.value, props.onChange);

    const {
        config,
        id,
        dimId,
        parallelism,
        type,
    } = props.value;
    return <>
        <Collapse title={JSON.stringify({id, type, config, parallelism})}
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

        </Collapse>
    </>
}

export default StorageConfig;
