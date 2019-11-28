import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import ToggleFavoriteCommand from "../../redux/commands/profile/ToggleFavoriteCommand";
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