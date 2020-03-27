import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {push} from "connected-react-router";

export default function Test(dispatch: Dispatch<any>): HotKeyAction {
    return {
        hotkey: 'mod+p',
        action() {
            dispatch(push('/posts'));
        }
    }
}