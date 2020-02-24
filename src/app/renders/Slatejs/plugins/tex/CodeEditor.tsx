import React, {FunctionComponent, useMemo, useState} from 'react';
import {Controlled as CodeMirror} from "react-codemirror2";
import 'codemirror/mode/stex/stex';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/yaml/yaml';

interface Props {
    value: string,
    onChange(value: string): void,
    mode?: 'python' | 'javascript' | 'stex' | 'xml' | 'yaml',
    onBlur?() :void,
}

const CodeEditor: FunctionComponent<Props> = (props) => {

    const mode = props.mode || 'javascript';
    const [value, setValue] = useState(props.value);

    const syncValue = useMemo(() => {
        let timer: any = null;
        return newV => {
            setValue(newV);
            clearTimeout(timer);
            timer = setTimeout(() => props.onChange(newV), 200);
        }
    }, []);

    return <>
        <CodeMirror
            value={value}
            options={{
                mode: mode,
                theme: 'monokai',
                lineNumbers: true
            }}
            selection={{
                ranges: [],
                focus: true,
            }}
            onBlur={(editor, event) => {
                event.stopPropagation();
                if (props.onBlur) {
                    props.onBlur();
                }
            }}
            onBeforeChange={(editor, data, value) => {
                syncValue(value);
            }}/>
    </>;
};

export default CodeEditor;
