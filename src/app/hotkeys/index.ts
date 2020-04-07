import HotkeyGitPush from "./HotkeyGitPush";
import HotkeyGitPull from "./HotkeyGitPull";
import Setting from "./Setting";
import CreatePost from "./CreatePost";
import Test from "./Test";
import {ToggleFavorite} from "./ToggleFavorite";
import closePost from "./HotkeyClosePost";

export interface HotKeyAction {
    hotkey: string,
    action: () => void,
}

export function createHotKeyPlugins(dispatch, state): Array<HotKeyAction> {
    const plugins = [
        HotkeyGitPush,
        HotkeyGitPull,
        Setting,
        CreatePost,
        Test,
        ToggleFavorite,
        closePost,
    ];

    return plugins.map(p => p(dispatch, state));
}