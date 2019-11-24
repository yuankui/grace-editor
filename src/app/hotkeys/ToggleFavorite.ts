import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {AppStore} from "../../redux/store";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../redux/utils";
import {PostSelectCommand} from "../../redux/commands/menu/PostSelectCommand";
import ToggleFavoriteCommand from "../../redux/commands/favor/ToggleFavoriteCommand";
import {parseCurrentPostId} from "../../utils";
import {GetState} from "../renders/Slatejs/SlatejsRender";

export function ToggleFavorite(dispatch: Dispatch<any>, getState: GetState): HotKeyAction {
    return {
        hotkey: 'Meta+d',
        action() {
            const postId = parseCurrentPostId(getState());
            if (postId  == null)
                return;
            dispatch(new ToggleFavoriteCommand(postId));
        }
    }
}