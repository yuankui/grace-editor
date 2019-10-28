import {Dispatch} from "redux";
import {AppStore} from "../../redux/store";

export interface HotKeyAction {
    hotkey: string,
    action: () => void,
}

export interface HotKey {
    (dispatch: Dispatch<any>, state: AppStore): HotKeyAction,
}