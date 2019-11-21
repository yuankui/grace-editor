import {useStore} from "react-redux";
import React from "react";
import {AppStore} from "../../redux/store";
import {Collapse} from "../post/Collapse";
import {PostTree} from "../post/PostTree";
import {If} from "../../utils";
import {PostHolder} from "../post/PostHolder";

export const PostRepository: React.FC = () => {
    const posts = useStore<AppStore>().getState().posts;
    let topPostIds = posts.childrenMap.get(null);
    if (topPostIds == null)
        topPostIds = [];


    const children = topPostIds
        .sort((a, b) => {
            const weightA = posts.posts.get(a).weight;
            const weightB = posts.posts.get(b).weight;
            return weightA.localeCompare(weightB);
        })
        .map((postId, index) => {
            return <React.Fragment key={postId}>
                <If key={postId + '-before'} test={index === 0}>
                    <PostHolder postId={postId} mode={"before"}/>
                </If>
                <PostTree key={postId} postId={postId}/>
                <PostHolder key={postId + 'after'} postId={postId} mode={"after"}/>
            </React.Fragment>;
        });
    return <Collapse title={"Repository"} visible={true}>
        {children}
    </Collapse>;
};