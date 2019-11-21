import React from "react";
import {If} from "../../utils";
import {useStore} from "react-redux";
import {AppStore} from "../../redux/store";
import Collapse from "./Collapse";
import {PostTitle} from "./PostTitle";

interface Props {
    postId: string,
}

export const PostTree: React.FC<Props> = props => {
    const {posts, siderState} = useStore<AppStore>().getState();
    const post = posts.posts.get(props.postId);

    let children = posts.childrenMap.get(props.postId)
        .map(childId => {
            return <li key={childId}>
                <PostTree postId={childId}/>
            </li>;
        });

    const expanded = siderState.expandedKeys.some(v => v === props.postId);

    return <div draggable={true}>
        <Collapse className='app-post-tree-container'
                  title={<PostTitle post={post} expanded={expanded}/>}
                  visible={true}>
            <If test={children.length != 0 && expanded}>
                <ul>
                    {children}
                </ul>
            </If>
        </Collapse>
    </div>;
};