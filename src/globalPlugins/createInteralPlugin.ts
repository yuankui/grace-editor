import {Extension} from "./Extension";
import {createKeySoundPlugin} from "./KeySound/createKeySoundPlugin";
import {createFocusModePlugin} from "./FocusMode/createFocusModePlugin";

export function createInternalPlugin(): Array<Extension> {
    return [
        createKeySoundPlugin(),
        createFocusModePlugin(),
    ]
}