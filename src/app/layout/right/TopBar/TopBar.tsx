import React from "react";
import {If, mapState} from "../../../../utils";
import {connect, useDispatch} from "react-redux";
import GitCommitCommand from "../../../../redux/commands/git/GitCommitCommand";
import InputButton from "./InputButton";
import GitPushCommand from "../../../../redux/commands/git/GitPushCommand";
import GitPullCommand from "../../../../redux/commands/git/GitPullCommand";
import More from "./actions/More";
import {CreateNewPostCommand} from "../../../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../../../redux/utils";
import {FavorButton} from "./FavorButton";
import {Nav} from "./Nav";
import {ToggleMaximize} from "../../left/LeftHandle";
import {PostSelectCommand} from "../../../../redux/commands/menu/PostSelectCommand";
import useAppStore from "../../../hooks/useAppStore";
import {useLang} from "../../../../i18n/i18n";

const TopBar: React.FC<any> = () => {
    const dispatch = useDispatch();
    const state = useAppStore();

    const save = (message: string) => {
        dispatch(new GitCommitCommand(message));
    };

    const lang = useLang();

    return <div className='top-bar' onDoubleClick={ToggleMaximize}>
        <Nav/>
        <div className='tools' onDoubleClick={e => {
            e.stopPropagation();
            e.preventDefault();
        }}>
            <FavorButton/>
            <a onClick={() => {
                let postId = createPostId();
                dispatch(new CreateNewPostCommand(postId, null));
                dispatch(PostSelectCommand(postId));
            }}>{lang["top.create"]}</a>
            <InputButton placeHolder='commit message' onConfirm={save}>
                {lang["top.commit"]}
            </InputButton>
            <If test={state.status.canGitPush}>
                <a onClick={() => dispatch(new GitPushCommand())}>
                    {lang["top.push"]}
                </a>
            </If>
            <If test={state.status.canGitPull}>
                <a onClick={() => dispatch(new GitPullCommand())}>
                    {lang["top.pull"]}
                </a>
            </If>
            <More/>
        </div>
    </div>;
};

export default connect(mapState)(TopBar);