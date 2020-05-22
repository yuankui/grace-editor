import {EventType, Notifier} from "../hooks/useListener";
import isHotkey from "is-hotkey";

export interface keyBoardListener {
    (key: KeyboardEvent): boolean,
}

export function bindKey(key: string, event: EventType, notifier: Notifier): keyBoardListener {
    return e => {
        if (isHotkey(key, e)) {
            notifier(event, e);
            return true;
        }
        return false;
    }
}