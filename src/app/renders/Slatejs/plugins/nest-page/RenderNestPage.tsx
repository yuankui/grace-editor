import React, {FunctionComponent} from 'react';
import {RenderBlockProps} from "slate-react";
import {Editor} from "slate";
import {useDispatch} from "react-redux";
import useAppStore from "../../../../hooks/useAppStore";
import {classNames, If} from "../../../../../utils";
import {PostSelectCommand} from "../../../../../redux/commands/menu/PostSelectCommand";
import {getRender} from "../../../factory";

interface Props {
    props: RenderBlockProps,
    editor: Editor,
}

const RenderNestPage: FunctionComponent<Props> = (props) => {
    const {node, attributes, isFocused} = props.props;
    const store = useAppStore();
    const dispatch = useDispatch();
    const post = store.posts.posts.get(node.data.get('postId'));
    const classes = classNames([
        'focus-' + isFocused,
        'nest-page',
    ]);

    const Render = getRender(post);
    return <div {...attributes} className={classes}>
        <If test={post == null}>
            <div className='post-missing'>post missing</div>
        </If>
        <If test={post != null}>
            <div className='nest-page-title'>
                <a onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (post != null) {
                        dispatch(PostSelectCommand(post.id));
                    }
                }}>{post.title}</a>
            </div>
            <Render value={post.content} readOnly={true} onChange={() =>{}}/>
        </If>
    </div>;
};

export default RenderNestPage;
