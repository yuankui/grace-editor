import React, {FunctionComponent, useState} from 'react';
import {Value} from "../../Value";
import {Controlled as CodeMirror} from "react-codemirror2";
import {TairStorageConfig} from "../../Models";
import {changeValue} from "../../utils";
import Collapse from "../../components/Collapse";
import FormItem from "../../components/FormItem";
import Input from "../../Input";
import {InputNumber} from "antd";

interface Props extends Value<TairStorageConfig>{

}

export interface ToTitle {
    toTitle: (any) => string,
}

const TairPlugin: FunctionComponent<Props> & ToTitle = (props) => {

    const change = changeValue(props.value, props.onChange);
    const {timeout, area, prefix, remoteKey, ttl} = props.value || {};
    return <Collapse title={"SquirrelStorage"} visible={true}>
        <FormItem label={'remoteKey'}>
            <Input value={remoteKey} onChange={change('remoteKey')}/>
        </FormItem>
        <FormItem label={'area'}>
            <InputNumber onChange={change("area")} value={area}/>
        </FormItem>
        <FormItem label={'prefix'}>
            <Input onChange={change("prefix")} value={prefix}/>
        </FormItem>
        <FormItem label={'ttl'}>
            <InputNumber placeholder={'ttl'} onChange={change("ttl")} value={ttl}/>
        </FormItem>
        <FormItem label={'timeout'}>
            <InputNumber placeholder={'ms'} onChange={change("timeout")} value={timeout}/>
        </FormItem>
    </Collapse>;
};

TairPlugin.toTitle = config => {
    return `tair: ${config.remoteKey}: ${config.area}`;
};

export default TairPlugin;
