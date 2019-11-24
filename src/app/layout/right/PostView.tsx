import React from "react";
import {useDispatch, useStore} from "react-redux";
import {AppStore, Post} from "../../../redux/store";
import EditorContent from "./EditorContent";
import {UpdatePostCommand} from "../../../redux/commands/post/UpdatePostCommand";
import { useLocation } from "react-router";
import {useCurrentPostId} from "../../../utils";

export const PostView: React.FC = () => {
    let location = useLocation();

    // console.log('location', location);

    const state = useStore().getState() as AppStore;
    const dispatch = useDispatch();
    let currentPostId = useCurrentPostId();

    if (currentPostId == null) {
        return null;
    }

    const postId = currentPostId;
    const post = state.posts.posts.get(postId);
    if (post == null) {
        return null;
    }

    const onChange = (post: Post) => {
        dispatch(new UpdatePostCommand(post));
    };

    return <EditorContent onChange={onChange}
                          key={postId ? postId : ""}
                          post={post}
    />
};