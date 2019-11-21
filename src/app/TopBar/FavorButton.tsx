import React from "react";
import {useDispatch, useStore} from "react-redux";
import {AppStore} from "../../redux/store";
import {Icon} from "antd";
import ToggleFavoriteCommand from "../../redux/commands/favor/ToggleFavoriteCommand";

export const FavorButton: React.FC = () => {
    const state: AppStore = useStore().getState();
    const dispatch = useDispatch();

    const {posts: {currentPostId}, settings} = state;

    if (currentPostId == null) {
        return null;
    }

    const favor = settings.favor || {};
    const favorPosts = favor.posts || [];

    let child: any =  null;
    if (favorPosts.some(p => p == currentPostId)) {
        child = <Icon type="heart" theme="filled" />
    } else {
        child = <Icon type="heart" />
    }

    return <a onClick={() => dispatch(new ToggleFavoriteCommand(state.posts.currentPostId as string))}>
        {child}
    </a>
};