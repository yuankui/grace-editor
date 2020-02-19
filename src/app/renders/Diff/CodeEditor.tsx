import React, {FunctionComponent, useMemo} from 'react';
import {Editor} from "slate-react";
import {Value} from "slate";
import {createHighlightPlugin} from "./plugins/HighlightPlugin";
import {createLinePlugin} from "./plugins/LinePlugin";
import {createCommonPlugin} from "./plugins/CommonPlugin";
import {createDiffPlugin} from "./plugins/DiffPlugin";
import {createFormatPlugin} from "./plugins/FormatPlugin";

interface Props {
    value: Value,
    onChange: (v: Value) => void,
}

const CodeEditor: FunctionComponent<Props> = (props) => {
    const plugins = useMemo(() => {
        return [
            createHighlightPlugin(),
            createLinePlugin(),
            createCommonPlugin(),
            createDiffPlugin(),
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
        renderBlock={linePlugin.renderBlock}
        onChange={e => {
            props.onChange(e.value);
        }}/>;
};

export default CodeEditor;
