import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import GitPushCommand from "../../redux/commands/git/GitPushCommand";

export default function gitPull(dispatch: Dispatch<any>): HotKeyAction {
    return {
        hotkey: 'mod+l',
        action() {
            dispatch(new GitPushCommand());
        }
    }
}