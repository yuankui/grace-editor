import {useStore} from "react-redux";
import React from "react";
import {AppStore, getParents} from "../../../../redux/store";
import {If} from "../../../../utils";
import {PostHolder} from "../../../post/PostHolder";
import {ExpandPostTree} from "../../../post/ExpandPostTree";
import {SiderGroup} from "../sider/SiderGroup";
import {useLang} from "../../../../i18n/i18n";
import useAppStore from "../../../hooks/useAppStore";
import {useMessage} from "../../../message/message";

export const PostRepository: React.FC = () => {
    const store = useStore<AppStore>();
    const {posts} = store.getState();
    let topPostIds = posts.childrenMap.get(null);
    if (topPostIds == null)
        topPostIds = [];

    const lang = useLang();
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
                <ExpandPostTree key={postId} postId={postId}/>
                <PostHolder key={postId + 'after'} postId={postId} mode={"after"}/>
            </React.Fragment>;
        });

    return <SiderGroup title={lang["left.repository.title"]}>
            {children}
        </SiderGroup>
};