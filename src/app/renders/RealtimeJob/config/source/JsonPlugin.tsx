import React, {FunctionComponent} from 'react';
import {Value} from "../../Value";
import {ToTitle} from "./TairPlugin";
import JsonValue from "../../components/JsonValue";

interface Props extends Value<any>{

}

const JsonPlugin: FunctionComponent<Props> & ToTitle = (props) => {
    return <JsonValue {...props}/>
};

JsonPlugin.toTitle = any => {
    return JSON.stringify(any);
};

export default JsonPlugin;
