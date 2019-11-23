import React from "react";
import {useDispatch, useStore} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {PostSelectCommand} from "../../../../../redux/commands/menu/PostSelectCommand";

interface Props {
    postId: string,
    title: string,
}

export const PostLink: React.FC<Props> = (props) => {
    const state = useStore().getState() as AppStore;
    const dispatch = useDispatch();
    const post = state.posts.posts.get(props.postId);
    if (post == null) {
        return <a className='app-post-missing'>
            <del>{props.title}</del>
        </a>;
    }

    return <a className='app-post-link' onClick={() => {
        dispatch(PostSelectCommand(props.postId));
    }}>
        {post.title}
    </a>;
};