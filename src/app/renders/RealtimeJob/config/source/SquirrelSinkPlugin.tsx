import React, { FunctionComponent } from 'react';
import {Value} from "../../Value";
import {SquirrelStorageConfig} from "../../Models";
import {changeValue} from "../../utils";
import Collapse from "../../components/Collapse";
import FormItem from "../../components/FormItem";
import Input from "../../Input";
import {InputNumber} from "antd";

interface Props extends Value<SquirrelStorageConfig>{

}

function SquirrelSinkPlugin(props: Props) {
    const change = changeValue(props.value, props.onChange);

    const {category, cluster, timeout} = props.value || {};
    return <Collapse title={"SquirrelStorage"} visible={true}>
        <FormItem label={'cluster'}>
            <Input value={cluster} onChange={change('cluster')}/>
        </FormItem>
        <FormItem label={'category'}>
            <Input onChange={change("category")} value={category}/>
        </FormItem>
        <FormItem label={'timeout'}>
            <InputNumber placeholder={'ms'} onChange={change("timeout")} value={timeout}/>
        </FormItem>
    </Collapse>;
}

SquirrelSinkPlugin.toTitle = config => {
    return `Squirrel: ${config.cluster}: ${config.category}`;
};


export default SquirrelSinkPlugin;
