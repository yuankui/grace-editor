import React, {FunctionComponent, useState} from 'react';
import {Value} from "../../Value";
import {Controlled as CodeMirror} from "react-codemirror2";
import {ToTitle} from "./TairPlugin";

interface Props extends Value<any>{

}

const JsonPlugin: FunctionComponent<Props> & ToTitle = (props) => {
    let [json, setJson] = useState('');
    if (json == '') {
        json = JSON.stringify(props.value, null, 2);
    }

    return <>
        <CodeMirror
            className='json-plugin'
            value={json}
            options={{
                mode: 'javascript',
                theme: 'monokai',
                lineNumbers: true
            }}
            onBlur={e => {
                props.onChange(JSON.parse(json));
            }}
            onBeforeChange={(editor, data, value) => {
                setJson(value);
            }}/>
    </>;
};

JsonPlugin.toTitle = any => {
    return JSON.stringify(any);
};

export default JsonPlugin;
