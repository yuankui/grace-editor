import Setting from "./Setting";
import CreatePost from "./CreatePost";
import Test from "./Test";
import {ToggleFavorite} from "./ToggleFavorite";
import closePost from "./HotkeyClosePost";
import closeApp from "./HotkeyCloseApp";

export interface HotKeyAction {
    hotkey: string,
    action: () => void,
}

export function createHotKeyPlugins(dispatch, state): Array<HotKeyAction> {
    const plugins = [
        Setting,
        CreatePost,
        Test,
        ToggleFavorite,
        closePost,
        closeApp,
    ];

    return plugins.map(p => p(dispatch, state));
}