import React, {FunctionComponent, useEffect, useRef} from 'react';
import {Controlled as CodeMirror} from "react-codemirror2";
import {BlockTypeCodeBlock} from "./CodePlugin";
import useTheme from "../../../../hooks/useTheme";
import {Editor, RenderBlockProps} from "slate-react";
import {classNames} from "../../../../../utils";
import codeMirror from "codemirror";
import isHotkey from "is-hotkey";

interface Props {
    props: RenderBlockProps,
    editor: Editor,
}

const CodeBlock: FunctionComponent<Props> = (props) => {
    const {node, isFocused, isSelected} = props.props;
    const code = node.data.get('code') || Array.from(node.texts({})).map(([n]) => n.text).join('\n');
    const lang = node.data.get('lang') || "javascript";

    const theme = useTheme();

    const className = classNames([
        BlockTypeCodeBlock,
        'select-' + isSelected,
        'focus-' + isFocused,
    ]);

    const ref = useRef<codeMirror.Editor>(null as any);

    useEffect(() => {
        if (props.props.isSelected) {
            ref?.current?.focus();
        }
    }, [props.props.isSelected]);

    useEffect(() => {
        setTimeout(() => {
            if (ref.current != null) {
                ref.current.focus();
            }
        }, 300); // 创建后延迟默认focus，但是这样也会导致一个问题：如果有代码的的post，打开时会默认选择最后一个代码段，而不是正文

    }, []);
    return <div className={className}
                {...props.props.attributes}
                onClick={e=> {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
        <CodeMirror
            editorDidMount={editor => {
                ref.current = editor;
                setTimeout(() => {
                    editor.refresh();
                }, 100);
            }}
            value={code}
            options={{
                mode: lang,
                theme: theme.type === 'dark' ? 'base16-dark' : 'base16-light',
                lineNumbers: true,
            }}
            onKeyDown={(e, event) => {
                if (ref.current == null) return;
                const editor = ref.current;
                const cursor = editor.getCursor();
                const lineCount = editor.lineCount();
                console.log(cursor);
                // 判断是否到了边界

                if (cursor.line == lineCount - 1) {
                    // 到了下边界
                    if (isHotkey('down', event as any)) {
                        console.log('move down');
                        props.editor.focus();
                        props.editor.moveFocusToStartOfNextBlock();
                        props.editor.moveAnchorToStartOfNextBlock();
                        return;
                    }
                }
                if (cursor.line == 0) {
                    // 到了上边界
                    if (isHotkey('up', event as any)) {
                        console.log('move up');
                        props.editor.focus();
                        props.editor.moveFocusToEndOfPreviousBlock();
                        props.editor.moveAnchorToEndOfPreviousBlock();
                        return;
                    }
                }
            }}
            onBeforeChange={(editor, data, value) => {
                props.editor.setNodeByKey(node.key, {
                    type: BlockTypeCodeBlock,
                    data: {
                        code: value,
                        lang: lang,
                    }
                })
            }}/>
    </div>
};

export default CodeBlock;
