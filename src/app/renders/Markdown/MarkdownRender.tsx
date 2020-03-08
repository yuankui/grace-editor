import React, {FunctionComponent, useState} from 'react';
import {RenderProps} from "../renders";
import MarkdownPreview from "./MarkdownPreview";
import MarkdownEditor from "./MarkdownEditor";


const MarkdownRender: FunctionComponent<RenderProps> = (props) => {
    const text = props.value || '# Title1';
    return <div className='app-markdown-render'>
        <MarkdownEditor value={text} onChange={value => {
            props.onChange(value);
        }}/>
        <MarkdownPreview value={text}/>
    </div>;
};

export default MarkdownRender;
