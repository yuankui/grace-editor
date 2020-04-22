import {Plugin} from "slate-react";
import React from "react";
import isHotkey from "is-hotkey";


export function createCommonPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (isHotkey('tab', event.nativeEvent)) {
                editor.insertText('  ');
                return;
            }

            return next();
        }
    }
}