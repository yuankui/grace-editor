import React, {CSSProperties, FunctionComponent, useMemo, useState} from 'react';
import {Editor, RenderBlockProps} from "slate-react";
import Plain from 'slate-plain-serializer';
import {Editor as CoreEditor, Value} from "slate";
import {renderDecoration} from "./editor/renderDecoration";
import decorateNode from "./editor/decorateNode";
import isHotkey from "is-hotkey";
import {classNames} from "../../../utils";
import {useRefMessage} from "../../message/message";
import {lazyExecute} from "../../../utils/lazyExecute";


interface Props {
    value: string,
    onChange(value: string): void,
    style: CSSProperties,
}

const MarkdownEditor: FunctionComponent<Props> = (props) => {

    const [value, setValue] = useState(checkCodeBlock(Plain.deserialize(props.value)));

    const lazyChange = useMemo(() => {
        return lazyExecute((v: Value) => {
            const text = v.document
                .nodes
                .map(n => n?.text || '')
                .join('\n');

            props.onChange(text);
            setValue(checkCodeBlock(v));
        }, 200);
    }, []);

    const onChange = (v: Value) => {
        setValue(v);
        lazyChange(v);
    };

    const ref = useRefMessage<any, Editor>('title-enter', (editor, data) => {
        editor?.focus();
    });

    return (
        <Editor
            ref={ref}
            className='app-markdown-editor'
            placeholder="Write some markdown..."
            value={value}
            onKeyDown={onKeyDown}
            style={props.style}
            renderDecoration={renderDecoration}
            decorateNode={decorateNode}
            renderBlock={renderBlock}
            onChange={e => {
                onChange(e.value);
            }}
        />
    );
};

const onKeyDown = (event: React.KeyboardEvent, editor: CoreEditor, next: () => any) => {
    if (isHotkey('tab', event.nativeEvent)) {
        editor.insertText('  ');
        event.stopPropagation();
        event.preventDefault();
        return;
    }

    next();
};

const renderBlock = (props: RenderBlockProps, editor: CoreEditor, next: () => any) => {
    const {node, attributes, children} = props;
    if (node.data.get('codeBlock') == true) {
        let className = classNames([
            'editor-code-block',
            'first-' + node.data.get('first'),
            'last-' + node.data.get('last'),
        ]);
        return <pre className={className} {...attributes}>
            {children}
        </pre>
    }
    return next();
};

const checkCodeBlock = (value: Value) => {
    let lines = value.document.nodes;
    let codeBlockIndex: any = null;
    lines.forEach((line, index) => {
        if (line == null) {
            return;
        }

        // 重置
        if (line.object === 'block') {
            if (line.data.get("codeBlock")) {
                value = value.setNode([index as number], {
                    data: {
                        codeBlock: false,
                    }
                })
            }
        }
        if (!line?.text.startsWith('```')) {
            return;
        }

        // 代码段开始，标记一下即可
        if (codeBlockIndex == null) {
            codeBlockIndex = index;
            return;
        }

        // 代码段结束，开始设置node的data
        for (let i = codeBlockIndex;i<= (index as number); i++) {
            value = value.setNode([i], {
                data: {
                    codeBlock: true,
                    first: i == codeBlockIndex,
                    last: i == index,
                }
            });
            // 重置
            codeBlockIndex = null;
        }
    });
    return value;
};
export default MarkdownEditor;
