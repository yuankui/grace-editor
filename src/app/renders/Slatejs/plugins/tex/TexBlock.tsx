import React, {FunctionComponent, useState} from 'react';
import 'katex/dist/katex.min.css';
import {classNames, If} from "../../../../../utils";
import {RenderBlockProps} from "slate-react";
import {Editor} from "slate";
import CodeEditor from "./CodeEditor";
import * as MathJax from "@nteract/mathjax";

interface Props {
    props: RenderBlockProps,
    editor: Editor,
}

/**
 * 公式
 * @param props
 * @constructor
 */
const TexBlock: FunctionComponent<Props> = (props) => {
    const {node} = props.props;
    const src = node.data.get('src');
    const [editMode, setEditMode] = useState(false);

    const changeSrc = (value: string) => {
        props.editor.setNodeByKey(node.key, {
            data: {
                src: value,
            }
        } as any);
    };

    const isFocus = props.props.isFocused || props.props.isSelected;
    const className = classNames([
        'block-tex',
        'focused-' + isFocus,
    ]);

    return <div {...props.props.attributes}
                onKeyDown={e => e.stopPropagation()}
                className={className}
                onDoubleClick={e => {
                    e.stopPropagation();
                    setEditMode(true);
                }}>


        <If key={1} test={src == null || src == ''}>
            Double Click to Edit
        </If>
        <If key={2} test={src != null && src != ''}>
            <MathJax.Node>{src}</MathJax.Node>
        </If>
        <If key={3} test={editMode && isFocus}>
            <div onClick={e=>{
                // 阻断消息，防止传给上层的slate，他会调用updateSelection，触发Codemirror的onBlur
                e.stopPropagation();
                e.preventDefault();
            }}>
                <CodeEditor mode={'stex'} value={src} onChange={changeSrc} onBlur={() => {
                    setEditMode(false);
                }}/>
            </div>

        </If>
    </div>;
};

export default TexBlock;
