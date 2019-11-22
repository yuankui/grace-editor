import React, {FC} from "react";
import {AppStore} from "../../redux/store";
import {useStore} from "react-redux";
import {If} from "../../utils";
import {ExpandPostTree} from "../post/ExpandPostTree";
import {SiderGroup} from "../sider/SiderGroup";

export const Favorite: FC = () => {
    const state: AppStore = useStore().getState();

    const favor = state.settings.favor || {};
    const posts = favor.posts || [];

    const children = posts
        .filter(p => state.posts.posts.get(p) != null)
        .map(postId => <ExpandPostTree key={postId} postId={postId}/>);

    return <SiderGroup title='Favorite'>
            <If test={posts.length == 0}>
                Empty collection
            </If>
            {children}
        </SiderGroup>
};