import React from "react";
import EditorContent from "./EditorContent";
import useAppStore from "../../hooks/useAppStore";
import {useCurrentPost} from "../../hooks/useCurrentPost";

export const PostView: React.FC = () => {

    const state = useAppStore();
    const post = useCurrentPost();
    if (post == null) {
        return null;
    }

    return <EditorContent key={post.id}
                          fullWidth={state.profile.content && state.profile.content.fullWidth}
                          post={post}
    />
};