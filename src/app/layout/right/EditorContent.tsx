import * as React from 'react';
import {ChangeEvent, createRef} from 'react';
import {Post} from "../../../redux/store";
import {getRender} from "../../renders/factory";
import {Editor} from "slate";
import {notify} from "../../message/message";
import isHotkey from "is-hotkey";


export interface Props {
    fullWidth: boolean,
    post: Post | null,
    onChange: (v: Post) => void,
}

export default class EditorContent extends React.Component<Props, any> {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.post == null) {
            return <div>
                还未打开文档哦。
            </div>
        }

        const post: Post = this.props.post;

        let Editor = getRender(post);

        // see src/app/renders/Markdown/MarkdownRender.tsx:32 MarkdownRender.fixWidth = true;
        // @ts-ignore
        const partialWidth = !this.props.fullWidth && !(Editor.fixWidth);
        const flex = partialWidth ? 0 : 1;

        return <div className='app-right-content'>
            <div className='post-editor' style={{
                flexGrow: flex,
            }}>
                <div className='title'>
                    <input placeholder={"Untitled"}
                           onKeyDown={e => {
                               if (isHotkey('enter', e.nativeEvent)) {
                                   e.stopPropagation();
                                   e.preventDefault();
                                   notify("title-enter");
                               }
                           }}
                           key={post.id}
                           defaultValue={post.title}
                           onChange={this.onTitleChange}/>
                </div>

                {/*<Tags value={post.tags} onChange={this.onTagsChange}/>*/}
                <div className='content'>
                    <Editor value={post.content} onChange={v => this.onContentChange(v)}/>
                </div>
            </div>
        </div>
    }

    onContentChange = (value: any) => {
        console.log(JSON.stringify(value));
        this.props.onChange({
            ...this.props.post as Post,
            content: value,
        })
    };

    onTitleChange = (value: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange({
            ...this.props.post as Post,
            title: value.target.value,
        })
    };
}