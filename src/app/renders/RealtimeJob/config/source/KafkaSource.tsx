import React, {FunctionComponent} from 'react';
import Collapse from "../../components/Collapse";
import FormItem from "../../components/FormItem";
import {changeValue} from "../../utils";
import {KafkaSource as Source} from "../../Models";
import {Value} from "../../Value";
import Input from "../../Input";


const KafkaSource: FunctionComponent<Value<Source>> = (props) => {
    const change = changeValue(props.value, props.onChange);

    const {format, name, namespace, uid} = props.value || {};
    return <Collapse title={"KafkaSource"} visible={true}>
        <FormItem label={'uid'}>
            <Input value={uid} onChange={change('uid')}/>
        </FormItem>
        <FormItem label={'name'}>
            <Input onChange={change("name")} value={name}/>
        </FormItem>
        <FormItem label={'namespace'}>
            <Input onChange={change("namespace")} value={namespace}/>
        </FormItem>
        <FormItem label={'format'}>
            <Input onChange={change("format")} value={format}/>
        </FormItem>

    </Collapse>;
};

export default KafkaSource;
