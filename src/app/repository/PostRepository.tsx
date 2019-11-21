import {useStore} from "react-redux";
import React from "react";
import {AppStore} from "../../redux/store";
import {Collapse} from "../post/Collapse";
import {PostTree} from "../post/PostTree";

export const PostRepository: React.FC = () => {
    const posts = useStore<AppStore>().getState().posts;
    let topPostIds = posts.childrenMap.get(null);
    if (topPostIds == null)
        topPostIds = [];

    const children = topPostIds.map(postId => <PostTree key={postId} postId={postId}/>);
    return <Collapse title={"Repository"} visible={true}>
        {children}
    </Collapse>;
};