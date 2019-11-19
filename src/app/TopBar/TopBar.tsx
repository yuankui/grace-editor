import React from "react";
import {mapState, Rotate} from "../../utils";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore} from "../../redux/store";
import GitCommitCommand from "../../redux/commands/git/GitCommitCommand";
import InputButton from "./InputButton";
import GitPushCommand from "../../redux/commands/git/GitPushCommand";
import GitPullCommand from "../../redux/commands/git/GitPullCommand";
import {Button, Icon} from "antd";
import More from "./actions/More";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../redux/utils";
import PostSelectAction from "../../redux/actions/PostSelectAction";

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
        const list = this.state.logs
            .map((log, i) => <li key={i}>{log}</li>);

        return <div className='top-bar-container'>
            <div className='top-bar'>
                <div className='tools'>
                    <a onClick={() => {
                        this.props.dispatch(new CreateNewPostCommand(createPostId(), null));
                        this.props.dispatch(PostSelectAction());
                    }}>Create New</a>
                    <InputButton onConfirm={message => this.save(message)}>
                        Commit
                    </InputButton>
                    <a onClick={() => this.props.dispatch(new GitPushCommand())}>
                        Push
                    </a>
                    <a onClick={() => this.props.dispatch(new GitPullCommand())}>
                        Pull
                    </a>
                    <More />
                </div>
                <ul>
                    {list}
                </ul>
            </div>
        </div>
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