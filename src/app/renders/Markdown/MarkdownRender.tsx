import React, {CSSProperties, FunctionComponent, useEffect} from 'react';
import {RenderProps} from "../renders";
import MarkdownPreview from "./MarkdownPreview";
import MarkdownEditor from "./MarkdownEditor";
import Divider from "./Divider";
import {If} from "../../../utils";
import useAppStore from "../../hooks/useAppStore";
import PubSub from 'pubsub-js';

const MarkdownRender: FunctionComponent<RenderProps> = (props) => {
    const text = props.value || '# Title1';
    const state = useAppStore();

    const isPreview = state?.profile?.markdownPreview;

    useEffect(() => {
        const token = PubSub.subscribe("title-enter", () => {
            console.log("clicked!!!");
        });

        return () => {
            PubSub.unsubscribe(token);
        }
    });
    const singleStyle: CSSProperties = {
        flex: '0 1 ' + (isPreview? '49%': '100%'),
    };

    return <div className='app-markdown-render'>
        <MarkdownEditor style={singleStyle} value={text} onChange={value => {
            props.onChange(value);
        }}/>

        <If test={state?.profile?.markdownPreview}>
            <Divider/>
            <MarkdownPreview value={text}/>
        </If>
    </div>;
};

// @ts-ignore
MarkdownRender.fixWidth = true;

export default MarkdownRender;
