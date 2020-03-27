import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {ToggleSettingCommand} from "../../redux/commands/ToggleSettingCommand";

export default function Setting(dispatch: Dispatch<any>): HotKeyAction {
    return {
        hotkey: 'mod+,',
        action() {
            dispatch(new ToggleSettingCommand(true));
        }
    }
}