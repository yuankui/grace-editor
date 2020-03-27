import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../redux/utils";

export default function CreatePost(dispatch: Dispatch<any>): HotKeyAction {
    return {
        hotkey: 'mod+n',
        action() {
            const postId = createPostId();
            dispatch(new CreateNewPostCommand(postId, null));
        }
    }
}