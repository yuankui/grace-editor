import React from "react";
import {mapState} from "../../../../utils";
import {connect, useDispatch} from "react-redux";
import GitCommitCommand from "../../../../redux/commands/git/GitCommitCommand";
import GitPushCommand from "../../../../redux/commands/git/GitPushCommand";
import More from "./actions/More";
import {CreateNewPostCommand} from "../../../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../../../redux/utils";
import {FavorButton} from "./FavorButton";
import {Nav} from "./Nav";
import {ToggleMaximize} from "../../left/LeftHandle";
import {useLang} from "../../../../i18n/i18n";
import {ModalInput} from "./ModalInput/ModalInput";
import {useExtensionManager} from "../../../../globalPlugins/useExtensionManager";
import {UserCommand, UserCommandName, UserCommandSettingKey} from "../../global/settings/user-command/UserCommand";
import {executeCommand} from "../../global/settings/user-command/executeCommand";
import useAppStore from "../../../hooks/useAppStore";

const TopBar: React.FC<any> = () => {
    const dispatch = useDispatch();
    const state = useAppStore();

    const save = (message: string) => {
        dispatch(new GitCommitCommand(message));
    };

    const lang = useLang();

    const manager = useExtensionManager();
    const commands: Array<UserCommand> = manager.getSetting(UserCommandName, UserCommandSettingKey);

    const commandButtons = commands.filter(command => {
        return !!command.button
    })
        .map((command, i) => {
            return <a key={`command-` + i} onClick={() => executeCommand(command, state.settings.workSpace)}>
                {command.title}
            </a>
        });

    return <div className='top-bar' onDoubleClick={ToggleMaximize}>
        <Nav/>
        <div className='tools'
             onClick={e => {
                 e.stopPropagation();
                 e.preventDefault();
             }}
             onDoubleClick={e => {
                 e.stopPropagation();
                 e.preventDefault();
             }}>
            <FavorButton/>
            <a className='create-new-btn' onClick={() => {
                let postId = createPostId();
                dispatch(new CreateNewPostCommand(postId, null));
            }}>{lang["top.create"]}</a>
            <ModalInput placeHolder='commit message' onConfirm={save}>
                {lang["top.commit"]}
            </ModalInput>
            {commandButtons}
            <More/>
        </div>
    </div>;
};

export default connect(mapState)(TopBar);