import React, {useContext} from "react";
import {If} from "../../utils";
import {useDispatch, useStore} from "react-redux";
import {AppStore, getParents} from "../../redux/store";
import {Collapse} from "./Collapse";
import {PostTitle} from "./PostTitle";
import {useDrag, useDrop} from "react-dnd";
import {DragObjectPost, DragSourceTypes} from "./dnd/DragTypes";
import {PostHolder} from "./PostHolder";
import {ExpandContext} from "./ExpandContext";
import _ from 'lodash';
import {MovePostCommand} from "../../redux/commands/MovePostCommand";
import useAppStore from "../hooks/useAppStore";

interface Props {
    postId: string,
}

export const PostTree: React.FC<Props> = props => {
    const {posts} = useAppStore();
    const post = posts.posts.get(props.postId);
    const dispatch = useDispatch();

    let children = posts.childrenMap.get(props.postId)
        .sort((a, b) => {
            const weightA = posts.posts.get(a).weight;
            const weightB = posts.posts.get(b).weight;
            return weightA.localeCompare(weightB);
        })
        .map((childId, index) => {
            return <li key={childId}>
                <If test={index === 0}>
                    <PostHolder postId={childId} mode='before' />
                </If>
                <PostTree postId={childId}/>
                <PostHolder postId={childId} mode='after' />
            </li>;
        });

    const expandContext = useContext(ExpandContext);
    const expanded = expandContext.value.some(v => v === props.postId);

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
        canDrop: item => {
            const parents = getParents(post.id, posts);
            return !_.includes(parents, item.srcId);
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
                                    onExpand={expand => {
                                        expandContext.toggle(post.id);
                                    }}
                                    expanded={expanded}/>}
                  >
            <If test={children.length != 0 && expanded}>
                <ul>
                    {children}
                </ul>
            </If>
        </Collapse>
    </div>;
};