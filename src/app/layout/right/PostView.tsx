import React from "react";
import {useDispatch} from "react-redux";
import {Post} from "../../../redux/store";
import EditorContent from "./EditorContent";
import {UpdatePostCommand} from "../../../redux/commands/post/UpdatePostCommand";
import {useCurrentPostId} from "../../../utils";
import useAppStore from "../../hooks/useAppStore";

export const PostView: React.FC = () => {

    const state = useAppStore();
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
                          fullWidth={state.profile.content && state.profile.content.fullWidth}
                          post={post}
    />
};