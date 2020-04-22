import {Extension} from "./Extension";
import {createKeySoundPlugin} from "./KeySound/createKeySoundPlugin";
import {createFocusModePlugin} from "./FocusMode/createFocusModePlugin";
import {createObjectEditorExtension} from "./ObjectEditor/createObjectEditorExtension";
import {createDiffExtension} from "./Diff/createDiffEditorExtension";

export function createInternalPlugin(): Array<Extension> {
    return [
        createKeySoundPlugin(),
        createFocusModePlugin(),
        createObjectEditorExtension(),
        createDiffExtension(),
    ]
}