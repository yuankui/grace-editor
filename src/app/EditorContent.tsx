import * as React from 'react';
import {ChangeEvent, createRef} from 'react';
import {RichEditor} from "../Editor/RichEditor";
import {Button} from "antd";
import {Backend, Post} from "../backend";
import {RawDraftContentState} from 'draft-js';

export interface Props {
    post: Post | null,
    backend: Backend,
    onChange: (v: Post) => void,
    onLocate: () => void,
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
        const editorState = this.props.post.content;
        const editingPost: Post = this.props.post;
        return <React.Fragment>
            <span className='title'>
                <Button className='locate-button' onClick={e => this.locate()}>
                    <i className="material-icons">adjust</i>
                </Button>
                <input placeholder={"Untitled"}
                       key={this.props.post.id}
                       ref={this.titleRef}
                       defaultValue={editingPost.title}
                       onChange={this.onTitleChange}/>
            </span>
            <RichEditor ref={this.editor}
                        key={this.props.post.id}
                        backend={this.props.backend}
                        editable={true}
                        content={editorState}
                        onChange={this.onContentChange}/>
        </React.Fragment>
    }

    onContentChange = (state: RawDraftContentState) => {
        this.props.onChange({
            ...this.props.post as Post,
            content: state,
        })
    };

    componentDidMount(): void {
        if (this.titleRef != null && this.titleRef.current != null) {
            new Mousetrap(this.titleRef.current)
                // 点击enter，切换到editor
                .bind("enter", e => {
                    if (this.editor.current != null) {
                        this.editor.current.focus();
                    }
                    e.preventDefault();
                })
                // 点击保存，禁止默认行为
                .bind('command+s', e => {
                    e.preventDefault();
                });
        }
    }

    onTitleChange = (value: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange({
            ...this.props.post as Post,
            title: value.target.value,
        })
    };

    focus() {
        if (this.editor.current != null) {
            this.editor.current.focus();
        }
    }

    private locate() {
        this.props.onLocate();
    }
}