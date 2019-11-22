import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {push} from "connected-react-router";
import {AppStore} from "../../redux/store";

export default function Test(dispatch: Dispatch<any>, state: AppStore): HotKeyAction {
    return {
        hotkey: 'Meta+p',
        action() {
            dispatch(push('/posts'));
        }
    }
}