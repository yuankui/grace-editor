import {Plugin} from 'slate-react';
import React from "react";
import BlockList from "./BlockList";
import isHotkey from "is-hotkey";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {HintUpdateCommand} from "../../../../../redux/commands/hint/HintUpdateCommand";
import SelectionToolbar from "../selection-hint/SelectionToolbar";


export function getSelectionCoords() {
    let sel = document.getSelection(), range, rect;
    let x = 0, y = 0;
    if (sel && sel.rangeCount) {
        range = sel.getRangeAt(0).cloneRange();
        if (range.getClientRects) {
            range.collapse(true);
            if (range.getClientRects().length > 0) {
                rect = range.getClientRects()[0];
                x = rect.left;
                y = rect.top;
            }
        }
    }
    return {x: x, y: y};
}

export default function createHintPlugin(store: AppStore, dispatch: Dispatch<any>): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (!isHotkey('/', event.nativeEvent)) {
                return next();
            }

            const {x, y} = getSelectionCoords();

            next();

            setTimeout(() => {
                dispatch(new HintUpdateCommand({
                    x,
                    y,
                    show: true,
                }));
            }, 100);
        },
        renderEditor: (props, editor, next) => {
            return <>
                <BlockList editor={editor}/>
                {next()}
            </>
        }
    }
};