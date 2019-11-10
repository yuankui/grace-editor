import React from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore} from "../../redux/store";
import GitCommitCommand from "../../redux/commands/git/GitCommitCommand";
import InputButton from "./InputButton";

interface Props {
    dispatch: Dispatch<any>,
    state: AppStore,
}

interface State {
    logs: Array<string>,
}

class GitManager extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            logs: [],
        }
    }

    render() {
        const buttons = [
            this.button('refresh', () => this.refresh()),
        ];

        const list = this.state.logs
            .map((log, i) => <li key={i}>{log}</li>);

        return <div>
            <div className='tools'>
                {buttons}
                <InputButton onConfirm={message => this.save(message)}>
                    commit
                </InputButton>
            </div>
            <ul>
                {list}
            </ul>
        </div>
    }

    save(message: string) {
        this.props.dispatch(new GitCommitCommand(message));
    }
    async refresh() {
        let git = this.props.state.repo;
        if (git) {
            let logs = await git.log();
            this.setState({
                logs: logs.all.slice(0, 5)
                    .map(l => `${l.message} @${l.date}`)
            })
        }
    }

    button(label: string, onClick: () => void) {
        return <button type='button' onClick={() => onClick()}>
            {label}
        </button>
    }

}

export default connect(mapState)(GitManager);