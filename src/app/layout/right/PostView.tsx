import React from "react";
import EditorContent from "./EditorContent";
import {useCurrentPostId} from "../../../utils";
import useAppStore from "../../hooks/useAppStore";

export const PostView: React.FC = () => {

    const state = useAppStore();
    let currentPostId = useCurrentPostId();

    if (currentPostId == null) {
        return null;
    }

    const postId = currentPostId;
    const post = state.posts.posts.get(postId);
    if (post == null) {
        return null;
    }

    return <EditorContent key={postId ? postId : ""}
                          fullWidth={state.profile.content && state.profile.content.fullWidth}
                          post={post}
    />
};