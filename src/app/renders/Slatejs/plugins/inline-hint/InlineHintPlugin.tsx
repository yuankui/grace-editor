import {Plugin} from 'slate-react';
import React from "react";
import {getSelectionCoords} from "../hint/HintPlugin";

export default function createInlineHintPlugin(): Plugin {
    return {

        onSelect: (event, editor, next) => {
            // not select a range
            if (editor.value.selection.isCollapsed) {
                next();
                return;
            }

            const {x, y} = getSelectionCoords();

            next();
        }
    }
}