import React, {FunctionComponent} from 'react';
import {RenderProps} from "../renders";
import MarkdownPreview from "./MarkdownPreview";
import MarkdownEditor from "./MarkdownEditor";
import Divider from "./Divider";
import {If} from "../../../utils";
import useAppStore from "../../hooks/useAppStore";

const MarkdownRender: FunctionComponent<RenderProps> = (props) => {
    const text = props.value || '# Title1';
    const state = useAppStore();
    return <div className='app-markdown-render'>
        <MarkdownEditor value={text} onChange={value => {
            props.onChange(value);
        }}/>

        <If test={state?.profile?.markdownPreview}>
            <Divider/>
            <MarkdownPreview value={text}/>
        </If>
    </div>;
};

export default MarkdownRender;
