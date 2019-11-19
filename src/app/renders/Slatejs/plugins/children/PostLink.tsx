import React from "react";
import {Dispatch} from "redux";
import {AppStore} from "../../../../../redux/store";
import {mapState} from "../../../../../utils";
import {connect} from "react-redux";
import {PostSelectCommand} from "../../../../../redux/commands/menu/PostSelectCommand";

interface Props {
    dispatch: Dispatch<any>,
    postId: string,
    title: string,
    state: AppStore,
}

class PostLink extends React.Component<Props> {
    render() {
        const post = this.props.state.posts.posts.get(this.props.postId);
        if (post == null) {
            return <a className='app-post-missing'>
                <del>{this.props.title}</del>
            </a>;
        }

        return <a className='app-post-link' onClick={() => this.goto()}>
            {post.title}
        </a>;
    }

    goto() {
        this.props.dispatch(new PostSelectCommand(this.props.postId));
    }
}

export default connect(mapState)(PostLink);