import React from "react";
import {useDispatch, useStore} from "react-redux";
import {AppStore} from "../../../../redux/store";
import {Icon} from "antd";
import ToggleFavoriteCommand from "../../../../redux/commands/favor/ToggleFavoriteCommand";
import {HintLink} from "./HinkLink";
import {useCurrentPostId} from "../../../../utils";

export const FavorButton: React.FC = () => {
    const state: AppStore = useStore().getState();
    const dispatch = useDispatch();
    const currentPostId = useCurrentPostId();

    const {settings} = state;

    if (currentPostId == null) {
        return null;
    }

    const favor = settings.favor || {};
    const favorPosts = favor.posts || [];

    let child: any =  <Icon type="heart" />;
    let hint = "Add to Favorite";
    if (favorPosts.some(p => p == currentPostId)) {
        child = <Icon type="heart" theme="filled" />
        hint = "Remove from Favorite";
    }

    return <HintLink hint={hint} onClick={() => dispatch(new ToggleFavoriteCommand(currentPostId))}>
        {child}
    </HintLink>
};