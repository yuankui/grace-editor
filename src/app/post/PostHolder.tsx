import React from "react";
import {useDrop} from "react-dnd";
import {DragObjectPost, DragSourceTypes} from "./dnd/DragTypes";
import {useDispatch} from "react-redux";
import {MoveBeforeAfterPostCommand} from "../../redux/commands/post/MoveBeforeAfterPostCommand";

interface Props {
    postId: string,
    mode: "before" | "after",
}

/**
 * 用来承载Post的拖拽功能
 *
 * 包括Before，After
 */
export const PostHolder: React.FC<Props> = props => {

    const dispatch = useDispatch();

    const [{isOver}, drop] = useDrop({
        accept: DragSourceTypes.PostTitle,
        drop: (item: DragObjectPost) => {
            dispatch(new MoveBeforeAfterPostCommand(item.srcId, props.postId, props.mode));
        },

        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return <div ref={drop} className={'app-post-holder ' + 'drag-over-' + isOver}/>;
};