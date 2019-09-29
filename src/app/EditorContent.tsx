import * as React from 'react';
import {MyEditor} from "../Editor/Editor";
import {EditingPost} from "../redux/store";
import {createRef} from "react";
import {Button} from "antd";
import {Backend} from "../backend";
import {ChangeEvent} from "react";
import {RawDraftContentState} from 'draft-js';

export interface Props {
    post: EditingPost | null,
    backend: Backend,
    onChange: (v: EditingPost) => void,
}
export default class EditorContent extends React.Component<Props, any> {
    private readonly editor: React.RefObject<MyEditor>;

    constructor(props) {
        super(props);
        this.editor = createRef();
    }

    render() {
        if (this.props.post == null) {
            return <div>
                还未打开文档哦。
            </div>
        }
        const editorState = this.props.post.content;
        const editingPost: EditingPost = this.props.post;
        return <React.Fragment>
            <span className='title'>
                        <Button className='locate-button'>
                            <i className="material-icons">adjust</i>
                        </Button>
                        <input placeholder={"Untitled"}
                               value={editingPost.title}
                               onChange={this.onTitleChange}
                               onKeyPress={this.focus}/>
                    </span>
            <MyEditor ref={this.editor}
                      key={this.props.post.id}
                      backend={this.props.backend}
                      editable={true}
                      content={editorState}
                      onChange={this.onContentChange}/>
        </React.Fragment>
    }

    onContentChange = (state: RawDraftContentState) => {
        this.props.onChange({
            ...this.props.post as EditingPost,
            content: state,
        })
    };
    onTitleChange = (value: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange({
            ...this.props.post as EditingPost,
            title: value.target.value,
        })
    };

    focus() {
        if (this.editor.current != null) {
            this.editor.current.focus();
        }
    }
}