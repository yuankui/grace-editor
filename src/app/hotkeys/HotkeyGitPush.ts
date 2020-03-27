import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import GitPushCommand from "../../redux/commands/git/GitPushCommand";

export default function gitPush(dispatch: Dispatch<any>): HotKeyAction {
    return {
        hotkey: 'mod+p',
        action() {
            dispatch(new GitPushCommand());
        }
    }
}