import React from "react";
import {If, mapState} from "../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../redux/store";

interface Props {
    postId: string,
    state: AppStore,
}

class PostTree extends React.Component<Props> {
    render() {
        const posts = this.props.state.posts;
        const post = posts.posts.get(this.props.postId);

        let children = posts.childrenMap.get(this.props.postId)
            .map(c => {
                return <li key={c}>
                    <PostTree postId={c} state={this.props.state}/>
                </li>;
            });

        return <div className='app-post-tree-container'>
            <div>{post.title}</div>
            <If test={children.length != 0}>
                <ul>
                    {children}
                </ul>
            </If>
        </div>;
    }
}

export default connect(mapState)(PostTree);