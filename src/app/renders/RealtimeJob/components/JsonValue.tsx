import React, {FunctionComponent, useMemo, useState} from 'react';
import {Value} from "../Value";
import {UnControlled as CodeMirror} from "react-codemirror2";
import Warn from "../../../../globalPlugins/ObjectEditor/Warn";

interface Props extends Value<any>{

}

const JsonValue: FunctionComponent<Props> = (props) => {
    const [error, setError] = useState('');
    const [tmpValue, setTmpValue] = useState('');

    const saveAsync = useMemo(() => {
        let timer: any = null;
        setTmpValue(JSON.stringify(props.value, null, 2));
        return (value: string, props) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                try {
                    const js = JSON.parse(value);
                    props.onChange(js);
                    setError('');
                } catch (e) {
                    const msg: string = e.toString();
                    const match = msg.match(/position ([0-9]+)/);
                    if (!match) {
                        setError(msg);
                    } else {
                        const pos = parseInt(match[1]);
                        const lines = value.substr(0, pos)
                            .split('\n')
                            .length;
                        setError(msg + ", line:" + lines);
                    }
                }
            }, 200);
        }
    }, []);
    return <div className='json-value'>
        <Warn error={error}>
            <CodeMirror
                value={tmpValue}
                options={{
                    mode: 'javascript',
                    theme: 'monokai',
                    lineNumbers: true
                }}
                onChange={(editor, data, value) => {
                    saveAsync(value, props);
                }}/>
        </Warn>
    </div>;
};

export default JsonValue;
