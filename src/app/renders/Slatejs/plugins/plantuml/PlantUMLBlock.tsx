import React, {FunctionComponent, useState} from 'react';
import {classNames, If} from "../../../../../utils";
import {Editor, RenderBlockProps} from "slate-react";
import {notify} from "../../../../message/message";
import ReactPlantUML from "react-plantuml";
import CodeEditor from "../tex/CodeEditor";
import './syntax';
import {lazyExecute} from "../../../../../utils/lazyExecute";

interface Props {
    props: RenderBlockProps,
    editor: Editor,
}

/**
 * 公式
 * @param props
 * @constructor
 */
const PlantUMLBlock: FunctionComponent<Props> = (props) => {
    const {node} = props.props;
    const src = node.data.get('src');

    const [imageSrc, setImageSrc] = useState(src);

    const [editMode, setEditMode] = useState(false);

    const lazyUpdateImage = lazyExecute((src: string) => {
        setImageSrc(src);
    }, 2000);
    const changeSrc = (value: string) => {
        props.editor.setNodeByKey(node.key, {
            data: {
                src: value,
            }
        } as any);

        lazyUpdateImage(value);
    };

    const isFocus = props.props.isFocused || props.props.isSelected;
    const className = classNames([
        'block-plantuml',
        'focused-' + isFocus,
    ]);

    return <div {...props.props.attributes}
                onKeyDown={e => e.stopPropagation()}
                className={className}
                onDoubleClick={e => {
                    e.stopPropagation();
                    setEditMode(true);
                    setTimeout(() => {
                        notify('codemirror-focus');
                    }, 10);
                }}>


        <If key={1} test={src == null || src == ''}>
            Double Click to Edit
        </If>
        <If key={2} test={src != null && src != ''}>
            <ReactPlantUML src={imageSrc} alt={'plantuml'}/>
        </If>
        <div className='plantuml-editor-wrapper'
             style={{display: editMode ? 'block' : 'none'}}
             onClick={e => {
                 // 阻断消息，防止传给上层的slate，他会调用updateSelection，触发Codemirror的onBlur
                 e.stopPropagation();
                 e.preventDefault();
             }}>
            <CodeEditor mode={'plantuml'}
                        value={src}
                        onChange={changeSrc}
                        onBlur={() => {
                            setEditMode(false);
                        }}/>
        </div>
    </div>;
};

export default PlantUMLBlock;
