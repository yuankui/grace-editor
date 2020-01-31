import React, {FunctionComponent, useMemo} from 'react';
import {Editor} from "slate-react";
import {Value} from "slate";
import {createHighlightPlugin} from "./plugins/HighlightPlugin";
import {createLinePlugin} from "./plugins/LinePlugin";

interface OwnProps {
    value: Value,
    onChange: (v: Value) => void,
}

type Props = OwnProps;

const CodeEditor: FunctionComponent<Props> = (props) => {
    const plugins = useMemo(() => {
        return [
            createHighlightPlugin(),
            createLinePlugin(),
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
