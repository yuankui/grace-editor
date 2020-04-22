import * as React from 'react';
import {ChangeEvent} from 'react';
import {Post} from "../../../redux/store";
import {useRender} from "../../renders/useRender";
import {Editor} from "slate";
import {notify} from "../../message/message";
import isHotkey from "is-hotkey";
import {useDispatch} from "react-redux";
import {UpdatePostCommand} from "../../../redux/commands/post/UpdatePostCommand";
import {usePluginHooks} from "../../../globalPlugins/usePluginHooks";


export interface Props {
    fullWidth: boolean,
    post: Post | null,
}

const EditorContent: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const onContentChange = (value: any) => {
        // console.log(JSON.stringify(value));
        dispatch(new UpdatePostCommand({
            id: post.id,
            content: value,
        }));
    };

    const onTitleChange = (value: ChangeEvent<HTMLInputElement>) => {
        dispatch(new UpdatePostCommand({
            id: post.id,
            title: value.target.value,
        }));
    };

    let contentHooks = usePluginHooks("internal.render.content");

    if (props.post == null) {
        return <div>
            还未打开文档哦。
        </div>
    }


    const post: Post = props.post;

    let Editor = useRender(post);
    let content = <Editor value={post.content} onChange={v => onContentChange(v)}/>;
    contentHooks.forEach(hook => {
        content = hook.hook(content);
    });

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
                {content}
            </div>
        </div>
    </div>
};

export default EditorContent;