import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {AppStore} from "../../redux/store";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../redux/utils";
import {PostSelectCommand} from "../../redux/commands/menu/PostSelectCommand";

export default function CreatePost(dispatch: Dispatch<any>, state: AppStore): HotKeyAction {
    return {
        hotkey: 'Meta+n',
        action() {
            const postId = createPostId();
            dispatch(new CreateNewPostCommand(postId, null));
            dispatch(new PostSelectCommand(postId));
        }
    }
}