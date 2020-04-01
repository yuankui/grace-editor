import * as React from 'react';
import {ChangeEvent} from 'react';
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

const EditorContent: React.FC<Props> = props => {
    const onContentChange = (value: any) => {
        console.log(JSON.stringify(value));
        props.onChange({
            ...props.post as Post,
            content: value,
        })
    };

    const onTitleChange = (value: ChangeEvent<HTMLInputElement>) => {
        props.onChange({
            ...props.post as Post,
            title: value.target.value,
        })
    };

    if (props.post == null) {
        return <div>
            还未打开文档哦。
        </div>
    }
    const post: Post = props.post;

    let Editor = getRender(post);

    // see src/app/renders/Markdown/MarkdownRender.tsx:32 MarkdownRender.fixWidth = true;
    // @ts-ignore
    const partialWidth = !props.fullWidth && !(Editor.fixWidth);
    const flex = partialWidth ? 0 : 1;

    return <div className='app-right-content'>
        <div className='post-editor' style={{
            flexGrow: flex,
        }}>
            <div className='title'>
                <input placeholder={"Untitled"}
                       autoFocus={true}
                       onKeyDown={e => {
                           if (isHotkey('enter', e.nativeEvent)) {
                               e.stopPropagation();
                               e.preventDefault();
                               notify("title-enter");
                           }
                       }}
                       key={post.id}
                       defaultValue={post.title}
                       onChange={onTitleChange}/>
            </div>

            {/*<Tags value={post.tags} onChange={this.onTagsChange}/>*/}
            <div className='content'>
                <Editor value={post.content} onChange={v => onContentChange(v)}/>
            </div>
        </div>
    </div>
};

export default EditorContent;