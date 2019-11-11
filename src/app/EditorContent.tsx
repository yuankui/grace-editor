import * as React from 'react';
import {ChangeEvent, createRef} from 'react';
import {RichEditor} from "../Editor/RichEditor";
import {Backend} from "../backend";
import Tags from "./Tags";
import {Post} from "../redux/store";
import {getRender} from "./renders/factory";
import isHotkey from "is-hotkey";

export interface Props {
    post: Post | null,
    backend: Backend,
    onChange: (v: Post) => void,
}

export default class EditorContent extends React.Component<Props, any> {
    private readonly editor: React.RefObject<RichEditor>;
    private readonly titleRef: React.RefObject<HTMLInputElement>;

    constructor(props) {
        super(props);
        this.editor = createRef();
        this.titleRef = createRef();
    }

    render() {

        if (this.props.post == null) {
            return <div>
                还未打开文档哦。
            </div>
        }

        const post: Post = this.props.post;

        let Editor = getRender(post);
        return <div className='post-editor'>
            <span className='title'>
                <input placeholder={"Untitled"}
                       key={post.id}
                       ref={this.titleRef}
                       defaultValue={post.title}
                       onChange={this.onTitleChange}/>
            </span>

            {/*<Tags value={post.tags} onChange={this.onTagsChange}/>*/}
            <Editor value={post.content} onChange={v => this.onContentChange(v)}/>
        </div>
    }

    onContentChange = (value: any) => {
        this.props.onChange({
            ...this.props.post as Post,
            content: value,
        })
    };

    componentDidMount(): void {
        if (this.titleRef != null && this.titleRef.current != null) {
            this.titleRef.current.addEventListener("onkeydown", e => {
                // 点击enter，切换到editor
                if (isHotkey('enter', e as KeyboardEvent)) {
                    if (this.editor.current != null) {
                        this.editor.current.focus();
                    }
                    e.preventDefault();
                } else if (isHotkey('meta+s', e as KeyboardEvent)) {
                    // 点击保存，禁止默认行为
                    e.preventDefault();
                }
            });
        }
    }

    onTitleChange = (value: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange({
            ...this.props.post as Post,
            title: value.target.value,
        })
    };

    onTagsChange = (value: Array<string>) => {
        this.props.onChange({
            ...this.props.post as Post,
            tags: value,
        })
    };

    focus() {
        if (this.editor.current != null) {
            this.editor.current.focus();
        }
    }
}