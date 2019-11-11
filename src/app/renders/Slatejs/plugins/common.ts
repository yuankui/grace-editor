import {Editor as CoreEditor} from "slate";
import React from "react";
import isHotkey from "is-hotkey";

export function ToggleBlockOnPrefix(prefix: string,
                                            event: React.KeyboardEvent<Element>,
                                            editor: CoreEditor,
                                            callback: () => void) {
        // 空格触发list
        if (isHotkey(' ', event.nativeEvent)) {
            if (editor.value.focusBlock.type == 'paragraph') {
                const previous = editor.value.focusBlock.text.substring(0, editor.value.selection.focus.offset);
                if (previous == prefix) {
                    editor.moveFocusToStartOfNode(editor.value.startBlock)
                        .deleteForward(prefix.length);

                    callback();
                    event.preventDefault();
                    return true;
                }
            }
        }
        return false;
}


export function readFile(file: Blob): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer: ArrayBuffer = reader.result;
            resolve(arrayBuffer);
        };

        const onError = (ev) => {
            reject(ev);
        };
        reader.onerror = onError;
        reader.onabort = onError;
        // read file
        reader.readAsArrayBuffer(file);
    })
}