import React, {ReactNode} from "react";
import {AppStore, Post, PostsStore} from "../../../../redux/store";
import {useStore} from "react-redux";
import {PostLink} from "../../../renders/Slatejs/plugins/children/PostLink";
import {useCurrentPostId} from "../../../../utils";

function tracePath(currentPostId: string, posts: PostsStore): Array<Post> {
    let {posts: map, parentMap} = posts;
    const res: Array<Post> = [];

    let maxCount = 100;
    while (currentPostId != null &&(maxCount--) > 0) {
        const post = map.get(currentPostId);
        res.push(post);
        currentPostId = parentMap.get(currentPostId) as string;
    }

    return res.reverse();
}

export const BreadCrumb: React.FC = () => {
    const state = useStore<AppStore>().getState();
    const currentPostId = useCurrentPostId();
    if (currentPostId == null) {
        return null;
    }
    const res: Array<ReactNode> = [];
    tracePath(currentPostId, state.posts)
        .forEach(p => {
            if (!p) return;
            res.push(<span key={'pre' + p.id}>/</span>);
            res.push(<PostLink key={p.id} postId={p.id} title='EmptyTitle'/>)
        });

    return <React.Fragment>
        {res}
    </React.Fragment>;
};