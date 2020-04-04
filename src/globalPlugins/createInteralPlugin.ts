import {GlobalPlugin} from "./GlobalPlugin";
import {createKeySoundPlugin} from "./KeySound/createKeySoundPlugin";
import {createFocusModePlugin} from "./FocusMode/createFocusModePlugin";

export function createInternalPlugin(): Array<GlobalPlugin> {
    return [
        createKeySoundPlugin(),
        createFocusModePlugin(),
    ]
}