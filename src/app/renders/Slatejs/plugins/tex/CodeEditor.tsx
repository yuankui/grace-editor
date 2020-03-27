import React, {FunctionComponent, useState} from 'react';
import {Controlled as CodeMirror} from "react-codemirror2";
import 'codemirror/mode/stex/stex';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/yaml/yaml';
import {lazyExecute} from "../../../../../utils/lazyExecute";
import {useRefMessage} from "../../../../hooks/useMessage";
import codeMirror from 'codemirror';

interface Props {
    value: string,
    onChange(value: string): void,
    mode?: 'python' | 'javascript' | 'stex' | 'xml' | 'yaml',
    onBlur?() :void,
}

const CodeEditor: FunctionComponent<Props> = (props) => {

    const mode = props.mode || 'javascript';
    const [value, setValue] = useState(props.value);

    const ref = useRefMessage<any, codeMirror.Editor>('codemirror-focus', (ref, data) => {
        ref?.focus();
        ref?.refresh();
    });

    let lazySave = lazyExecute(v => {
        props.onChange(v);
    }, 200);

    let syncValue = (v) => {
        setValue(v);
        lazySave(v);
    };

    return <CodeMirror
        editorDidMount={ref}
        value={value}
        options={{
            mode: mode,
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true,
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
        }}
    />
};

export default CodeEditor;
