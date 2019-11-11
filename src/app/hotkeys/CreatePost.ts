import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {AppStore} from "../../redux/store";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../redux/utils";

export default function CreatePost(dispatch: Dispatch<any>, state: AppStore): HotKeyAction {
    return {
        hotkey: 'Meta+n',
        action() {
            dispatch(new CreateNewPostCommand(createPostId(), null));
        }
    }
}