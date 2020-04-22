import React, {FunctionComponent, useMemo} from 'react';
import {Editor} from "slate-react";
import {Value} from "slate";
import {createHighlightPlugin} from "./plugins/HighlightPlugin";
import {createLinePlugin} from "./plugins/LinePlugin";
import {createCommonPlugin} from "./plugins/CommonPlugin";
import {createFormatPlugin} from "./plugins/FormatPlugin";

interface Props {
    value: Value,
    onChange: (v: Value) => void,
    readonly?: boolean,
}

const CodeEditor: FunctionComponent<Props> = (props) => {
    const plugins = useMemo(() => {
        return [
            createHighlightPlugin(),
            createLinePlugin(),
            createCommonPlugin(),
            createFormatPlugin(),
        ]
    }, []);

    const linePlugin = useMemo(() => {
        return createLinePlugin();
    }, []);

    return <Editor
        className='code-editor'
        plugins={plugins}
        value={props.value}
        readOnly={!!props.readonly}
        renderBlock={linePlugin.renderBlock}
        onChange={e => {
            if (e.value !== props.value) {
                props.onChange(e.value);
            }
        }}/>;
};

export default CodeEditor;
