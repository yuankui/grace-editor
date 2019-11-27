import React from "react";
import {If, mapState} from "../../../../utils";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore} from "../../../../redux/store";
import GitCommitCommand from "../../../../redux/commands/git/GitCommitCommand";
import InputButton from "./InputButton";
import GitPushCommand from "../../../../redux/commands/git/GitPushCommand";
import GitPullCommand from "../../../../redux/commands/git/GitPullCommand";
import More from "./actions/More";
import {CreateNewPostCommand} from "../../../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../../../redux/utils";
import PostSelectAction from "../../../../redux/actions/PostSelectAction";
import {FavorButton} from "./FavorButton";
import {Nav} from "./Nav";

interface Props {
    dispatch: Dispatch<any>,
    state: AppStore,
}

interface State {
    logs: Array<string>,
}

class TopBar extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            logs: [],
        }
    }

    render() {
        return <div className='top-bar'>
            <Nav/>
            <div className='tools'>
                <FavorButton/>
                <a onClick={() => {
                    this.props.dispatch(new CreateNewPostCommand(createPostId(), null));
                    this.props.dispatch(PostSelectAction());
                }}>Create New</a>
                <InputButton placeHolder='commit message' onConfirm={message => this.save(message)}>
                    Commit
                </InputButton>
                <If test={this.props.state.status.canGitPush}>
                    <a onClick={() => this.props.dispatch(new GitPushCommand())}>
                        Push
                    </a>
                </If>
                <If test={this.props.state.status.canGitPull}>
                    <a onClick={() => this.props.dispatch(new GitPullCommand())}>
                        Pull
                    </a>
                </If>
                <More/>
            </div>
        </div>;
    }

    save(message: string) {
        this.props.dispatch(new GitCommitCommand(message));
    }


    button(label: string, onClick: () => void) {
        return <button type='button' onClick={() => onClick()}>
            {label}
        </button>
    }

}

export default connect(mapState)(TopBar);