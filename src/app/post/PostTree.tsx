import React from "react";
import {If} from "../../utils";
import {useDispatch, useStore} from "react-redux";
import {AppStore} from "../../redux/store";
import {Collapse} from "./Collapse";
import {PostTitle} from "./PostTitle";
import {useDrag, useDrop} from "react-dnd";
import {DragObjectPost, DragSourceTypes} from "./dnd/DragTypes";
import {MovePostCommand} from "../../redux/commands/MovePostCommand";

interface Props {
    postId: string,
}

export const PostTree: React.FC<Props> = props => {
    const {posts, siderState} = useStore<AppStore>().getState();
    const post = posts.posts.get(props.postId);
    const dispatch = useDispatch();

    let children = posts.childrenMap.get(props.postId)
        .map(childId => {
            return <li key={childId}>
                <PostTree postId={childId}/>
            </li>;
        });

    const expanded = siderState.expandedKeys.some(v => v === props.postId);

    // post is draggable
    const [{isDragging}, drag] = useDrag({
        item: {
            type: DragSourceTypes.PostTitle,
            srcId: props.postId,
        } as DragObjectPost,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // post is also drop-able
    const [{isOver}, drop] = useDrop({
        accept: DragSourceTypes.PostTitle,
        drop: (item: DragObjectPost) => {
            dispatch(new MovePostCommand(item.srcId, post.id));
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return <div ref={drag} style={{
        opacity: isDragging ? 0.5 : 1,
    }}>
        <Collapse className='app-post-tree-container'
                  title={<PostTitle className={'app-drag-over-' + isOver}
                                    innerRef={drop}
                                    post={post}
                                    expanded={expanded}/>}
                  visible={true}>
            <If test={children.length != 0 && expanded}>
                <ul>
                    {children}
                </ul>
            </If>
        </Collapse>
    </div>;
};