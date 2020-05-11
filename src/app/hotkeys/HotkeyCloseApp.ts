import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import electron from "../../backend/electron/electron";

export default function closeApp(dispatch: Dispatch<any>): HotKeyAction {
    return {
        hotkey: 'mod+q',
        action() {
            electron.remote.app.exit();
        }
    }
}