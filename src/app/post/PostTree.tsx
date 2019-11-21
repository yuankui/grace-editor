import React from "react";
import {If, mapState} from "../../utils";
import {connect} from "react-redux";
import {AppStore, Post} from "../../redux/store";
import Collapse from "./Collapse";
import {Dispatch} from "redux";
import {PostTitle} from "./PostTitle";

interface Props {
    postId: string,
    state: AppStore,
    dispatch: Dispatch<any>,
}

class PostTree extends React.Component<Props> {
    render() {
        const posts = this.props.state.posts;
        const post = posts.posts.get(this.props.postId);

        let children = posts.childrenMap.get(this.props.postId)
            .map(childId => {
                return <li key={childId}>
                    <PostTree dispatch={this.props.dispatch} postId={childId} state={this.props.state}/>
                </li>;
            });

        const expanded = this.props.state.siderState.expandedKeys.some(v => v === this.props.postId);

        return <Collapse className='app-post-tree-container'
                         title={this.renderTitle(post, expanded)}
                         visible={true}>
            <If test={children.length != 0 && expanded}>
                <ul>
                    {children}
                </ul>
            </If>
        </Collapse>;
    }

    renderTitle(item: Post, expanded: boolean) {
        return <PostTitle post={item} expanded={expanded}/>
    }
}

export default connect(mapState)(PostTree);