import React, {FC} from "react";
import {AppStore} from "../../redux/store";
import {useStore} from "react-redux";
import {If} from "../../utils";
import {ExpandPostTree} from "../post/ExpandPostTree";
import {SiderGroup} from "../layout/left/sider/SiderGroup";
import {FavoritePostHolder} from "./PostHolder";

export const Favorite: FC = () => {
    const state: AppStore = useStore().getState();

    const favor = state.settings.favor || {};
    const posts = favor.posts || [];

    const children = posts
        .filter(p => state.posts.posts.get(p) != null)
        .map((postId, index) => <React.Fragment key={postId}>
            <If test={index === 0}>
                <FavoritePostHolder postId={postId} mode={"before"}/>
            </If>
            <ExpandPostTree postId={postId}/>
            <FavoritePostHolder postId={postId} mode={"after"}/>
        </React.Fragment>);

    return <SiderGroup title='Favorite'>
        <If test={posts.length == 0}>
            <div>
                Empty collection
            </div>
        </If>
        {children}
    </SiderGroup>
};