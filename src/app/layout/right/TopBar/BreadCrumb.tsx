import React, {ReactNode} from "react";
import {AppStore, Post, PostsStore} from "../../../../redux/store";
import {useStore} from "react-redux";
import {PostLink} from "../../../renders/Slatejs/plugins/children/PostLink";

function tracePath(posts: PostsStore): Array<Post> {
    let {posts: map, parentMap, currentPostId} = posts;
    const res: Array<Post> = [];

    while (currentPostId != null) {
        const post = map.get(currentPostId);
        res.push(post);
        currentPostId = parentMap.get(currentPostId);
    }

    return res.reverse();
}

export const BreadCrumb: React.FC = () => {
    const state = useStore<AppStore>().getState();

    const res: Array<ReactNode> = [];
    tracePath(state.posts)
        .forEach(p => {
            res.push(<span key={'pre' + p.id}>/</span>);
            res.push(<PostLink key={p.id} postId={p.id} title='EmptyTitle'/>)
        });

    return <React.Fragment>
        {res}
    </React.Fragment>;
};