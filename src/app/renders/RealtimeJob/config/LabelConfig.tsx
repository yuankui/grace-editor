import React, {ReactNode} from 'react';
import {Input, InputNumber, Select} from "antd";
import {Value} from "../Value";
import {Label} from "../Models";
import {changeValue} from "../utils";
import Collapse from "../components/Collapse";
import FormItem from "../components/FormItem";
import {Controlled as CodeMirror} from "react-codemirror2";
import JsonValue from "../components/JsonValue";
import Nullable from "../components/Nullable";
import NumberField from "../components/NumberField";

interface Props extends Value<Label>{
    deleteButton: ReactNode,
    sourceIds: Array<[number, string]>,
    storageIds: Array<[number, any]>,
}

function LabelConfig(props: Props) {
    const onChange = changeValue(props.value, props.onChange);

    const {
        labelId,
        labelName,
        collector,
        dimId,
        sampleRate,
        extractor,
        parallelism,
        sourceId,
        storageId
    } = props.value;
    return <>
        <Collapse title={`${labelName}`}
                  actions={props.deleteButton}
        >
            <FormItem label={'labelId'}>
                <InputNumber value={labelId} onChange={onChange('labelId')}/>
            </FormItem>
            <FormItem label={'采样率(测试用)'}>
                <Nullable component={NumberField} value={sampleRate} onChange={onChange('sampleRate')}/>
            </FormItem>
            <FormItem label={'labelName'}>
                <Input value={labelName} onChange={e => onChange('labelName')(e.target.value)}/>
            </FormItem>
            <FormItem label={'dimId'}>
                <InputNumber value={dimId} onChange={onChange('dimId')}/>
            </FormItem>
            <FormItem label={'并发'}>
                <InputNumber value={parallelism} onChange={onChange('parallelism')}/>
            </FormItem>

            <FormItem label={'数据源'}>
                <Select value={sourceId} onChange={onChange('sourceId')}>
                    {props.sourceIds.map(([id, name]) => {
                        return <Select.Option value={id} key={id}>
                            {name}
                        </Select.Option>
                    })}
                </Select>
            </FormItem>

            <FormItem label={'存储'}>
                <Select value={storageId} onChange={onChange('storageId')}>
                    {props.storageIds.map(([id, name]) => {
                        return <Select.Option value={id} key={id}>
                            {JSON.stringify(name)}
                        </Select.Option>
                    })}
                </Select>
            </FormItem>

            <FormItem label={'Extractor'}>
                <CodeMirror
                    value={extractor}
                    options={{
                        mode: 'javascript',
                        theme: 'monokai',
                        lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        onChange('extractor')(value);
                    }}/>
            </FormItem>

            <FormItem label={'Collector'}>
                <JsonValue value={collector} onChange={onChange('collector')}/>
            </FormItem>
        </Collapse>
    </>
}

export default LabelConfig;
