import {GlobalPlugin} from "./GlobalPlugin";
import {createKeySoundPlugin} from "./KeySound/createKeySoundPlugin";

export function createInternalPlugin(): Array<GlobalPlugin> {
    return [
        createKeySoundPlugin(),
    ]
}