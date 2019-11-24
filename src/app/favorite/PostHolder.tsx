import React from "react";
import {useDrop} from "react-dnd";
import {useDispatch, useStore} from "react-redux";
import {MoveBeforeAfterPostCommand} from "../../redux/commands/post/MoveBeforeAfterPostCommand";
import {AppStore, getParents} from "../../redux/store";
import _ from "lodash";
import {DragObjectPost, DragSourceTypes} from "../post/dnd/DragTypes";
import {MoveBeforeAfterFavoritePostCommand} from "../../redux/commands/favor/MoveBeforeAfterFavoritePostCommand";

interface Props {
    postId: string,
    mode: "before" | "after",
}

/**
 * 用来承载Post的拖拽功能
 *
 * 包括Before，After
 */
export const FavoritePostHolder: React.FC<Props> = props => {

    const dispatch = useDispatch();
    const state = useStore().getState() as AppStore;

    const [{isOver}, drop] = useDrop({
        accept: DragSourceTypes.PostTitle,
        drop: (item: DragObjectPost) => {
            dispatch(new MoveBeforeAfterFavoritePostCommand(item.srcId, props.postId, props.mode));
        },
        canDrop: item => {
            const parents = getParents(props.postId, state.posts);
            return !_.includes(parents, item.srcId);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return <div ref={drop} className={'app-post-holder ' + 'drag-over-' + isOver}/>;
};