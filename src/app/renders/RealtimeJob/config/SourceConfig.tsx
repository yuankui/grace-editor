import React, {FunctionComponent} from 'react';
import {Source} from "../Models";
import {Input, InputNumber, Select} from "antd";
import FormItem from "../components/FormItem";
import Collapse from "../components/Collapse";

interface Props {
    value: Source,
}

const SourceConfig: FunctionComponent<Props> = (props) => {
    return <>
        <Collapse title={"hello"}>
            <FormItem label={'sourceId'}>
                <InputNumber/>
            </FormItem>
            <FormItem label={'name'}>
                <Input/>
            </FormItem>
            <FormItem label={'type'}>
                <Select>
                    <Select.Option value='kafka-auth'>
                        kafka-auth
                    </Select.Option>
                </Select>
            </FormItem>
        </Collapse>
    </>
};

export default SourceConfig;
