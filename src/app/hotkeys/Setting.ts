import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {AppStore} from "../../redux/store";
import {ToggleSettingCommand} from "../../redux/commands/ToggleSettingCommand";

export default function Setting(dispatch: Dispatch<any>, state: AppStore): HotKeyAction {
    return {
        hotkey: 'mod+,',
        action() {
            dispatch(new ToggleSettingCommand(true));
        }
    }
}