import * as React from 'react';
import {ChangeEvent, createRef} from 'react';
import {Backend} from "../../../backend";
import {Post} from "../../../redux/store";
import {getRender} from "../../renders/factory";

export interface Props {
    post: Post | null,
    onChange: (v: Post) => void,
}

export default class EditorContent extends React.Component<Props, any> {
    private readonly titleRef: React.RefObject<HTMLInputElement>;

    constructor(props) {
        super(props);
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
        return <div className='app-right-content'>
            <div className='post-editor'>
                <div className='title'>
                    <input placeholder={"Untitled"}
                           key={post.id}
                           ref={this.titleRef}
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