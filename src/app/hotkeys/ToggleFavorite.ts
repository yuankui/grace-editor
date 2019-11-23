import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {AppStore} from "../../redux/store";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../redux/utils";
import {PostSelectCommand} from "../../redux/commands/menu/PostSelectCommand";
import ToggleFavoriteCommand from "../../redux/commands/favor/ToggleFavoriteCommand";
import {parseCurrentPostId} from "../../utils";

export function ToggleFavorite(dispatch: Dispatch<any>, state: AppStore): HotKeyAction {
    return {
        hotkey: 'Meta+d',
        action() {
            const postId = parseCurrentPostId(state);
            if (postId  == null)
                return;
            dispatch(new ToggleFavoriteCommand(postId));
        }
    }
}