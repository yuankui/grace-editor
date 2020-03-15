import React, {FunctionComponent, useState} from 'react';
import {Editor} from "slate-react";
import Plain from 'slate-plain-serializer';
import {Value} from "slate";
import {renderDecoration} from "./editor/renderDecoration";
import {decorateNode} from "./editor/decorateNode";


interface Props {
    value: string,
    onChange(value: string): void,
}

const MarkdownEditor: FunctionComponent<Props> = (props) => {

    const [value, setValue] = useState(Plain.deserialize(props.value));
    const onChange = (v: Value) => {
        setValue(v);
        const text = v.document
            .nodes
            .map(n => n?.text || '')
            .join('\n');

        console.log(text);
        props.onChange(text);
    };

    return (
        <Editor
            className='app-markdown-editor'
            placeholder="Write some markdown..."
            value={value}
            renderDecoration={renderDecoration}
            decorateNode={decorateNode}
            onChange={e => {
                onChange(checkCodeBlock(e.value));
            }}
        />
    );
};

const checkCodeBlock = (value: Value) => {

    value.document.nodes.forEach(line => {

    });
    return value;
};
export default MarkdownEditor;
