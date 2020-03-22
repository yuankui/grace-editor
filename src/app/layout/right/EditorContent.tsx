import * as React from 'react';
import {ChangeEvent, createRef} from 'react';
import {Post} from "../../../redux/store";
import {getRender} from "../../renders/factory";
import isHotkey from "is-hotkey";
import {Editor} from "slate";

export interface Props {
    fullWidth: boolean,
    post: Post | null,
    onChange: (v: Post) => void,
}

export default class EditorContent extends React.Component<Props, any> {
    private readonly titleRef: React.RefObject<HTMLInputElement>;
    private readonly contentRef: React.RefObject<any>;

    constructor(props) {
        super(props);
        this.titleRef = createRef();
        this.contentRef = createRef();
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
                                   const editor = this.contentRef.current as Editor;
                                   if (editor != null) {
                                       editor.moveAnchorToStartOfDocument();
                                       editor.moveFocusToStartOfDocument();
                                       editor.focus();
                                   }
                               }
                           }}
                           key={post.id}
                           ref={this.titleRef}
                           defaultValue={post.title}
                           onChange={this.onTitleChange}/>
                </div>

                {/*<Tags value={post.tags} onChange={this.onTagsChange}/>*/}
                <div className='content'>
                    <Editor editorRef={this.contentRef} value={post.content} onChange={v => this.onContentChange(v)}/>
                </div>
            </div>
        </div>
    }

    onContentChange = (value: any) => {
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