import {mapState} from "../../utils";
import {connect} from "react-redux";
import React from "react";
import {AppStore} from "../../redux/store";
import {Dispatch} from "redux";
import Collapse from "../post/Collapse";
import PostTree from "../post/PostTree";

interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
}

class PostRepository extends React.Component<Props> {
    render() {
        const posts = this.props.state.posts;
        let topPostIds = posts.childrenMap.get(null);
        if (topPostIds == null)
            topPostIds = [];

        const children = topPostIds.map(postId => <PostTree key={postId} postId={postId}/>);
        return <Collapse title={"Repository"} visible={true}>
            {children}
        </Collapse>;
    }
}

export default connect(mapState)(PostRepository);