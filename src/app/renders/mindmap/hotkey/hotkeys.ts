import isHotkey from "is-hotkey";
import {EventBus} from "../events/eventBus";
import {EventMap} from "../events/events";

export interface keyBoardListener {
    (key: KeyboardEvent): boolean,
}

export function bindKey<T extends keyof EventMap>(key: string, event: T, eventBus: EventBus): keyBoardListener {
    return e => {
        if (isHotkey(key, e)) {
            eventBus.emit(event, e);
            return true;
        }
        return false;
    }
}