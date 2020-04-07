import {HotKeyAction} from "./index";
import {Dispatch} from "redux";
import {push} from "connected-react-router";

export default function closePost(dispatch: Dispatch<any>): HotKeyAction {
    return {
        hotkey: 'mod+w',
        action() {
            dispatch(push('/'));
        }
    }
}