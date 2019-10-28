import React, {ReactNode} from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../redux/store";
import {Dispatch} from "redux";
import EditorContent from "../EditorContent";
import {Post} from "../../backend";
import {UpdatePostCommand} from "../../redux/commands/post/UpdatePostCommand";
import { match } from "react-router";

interface Params {
    postId: string,
}

interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
    match: match<Params>,
}

class PostView extends React.Component<Props> {

    render(): ReactNode {
        if (!this.props.match || !this.props.match.params || !this.props.match.params.postId) {
            return null;
        }

        const postId = this.props.match.params.postId;
        const post = this.props.state.posts.get(postId);
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