import React, {CSSProperties, FunctionComponent, useMemo, useState} from 'react';
import {RenderProps} from "../renders";
import MarkdownPreview from "./MarkdownPreview";
import MarkdownEditor from "./MarkdownEditor";
import Divider from "./Divider";
import {If} from "../../../utils";
import useAppStore from "../../hooks/useAppStore";
import {lazyExecute} from "../../../utils/lazyExecute";

const MarkdownRender: FunctionComponent<RenderProps> = (props) => {
    const text = props.value || '# Title1';
    const state = useAppStore();

    const [value, setValue] = useState(text);

    const lazySave = useMemo(() => {
        return lazyExecute((text: string) => {
            props.onChange(text);
        }, 500)
    }, []);

    const isPreview = state?.profile?.markdownPreview;

    const singleStyle: CSSProperties = {
        flex: '0 1 ' + (isPreview? '49%': '100%'),
    };

    return <div className='app-markdown-render'>
        <MarkdownEditor style={singleStyle}
                        value={value}
                        onChange={value => {
            setValue(value);
            lazySave(value);
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
