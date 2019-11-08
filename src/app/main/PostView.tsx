import React, {ReactNode} from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";
import {AppStore, Post} from "../../redux/store";
import {Dispatch} from "redux";
import EditorContent from "../EditorContent";
import {UpdatePostCommand} from "../../redux/commands/post/UpdatePostCommand";


interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
}

class PostView extends React.Component<Props> {

    render(): ReactNode {
        if (this.props.state.posts.currentPostId == null) {
            return null;
        }

        const postId = this.props.state.posts.currentPostId;
        const post = this.props.state.posts.posts.get(postId);
        if (post == null) {
            return null;
        }

        return <EditorContent onChange={this.onChange}
                              key={postId ? postId : ""}
                              backend={this.props.state.backend}
                              post={post}
        />
    }

    onChange = (post: Post) => {
        this.props.dispatch(new UpdatePostCommand(post));
    };

}

export default connect(mapState)(PostView);