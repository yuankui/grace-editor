import {Plugin} from 'slate-react';
import React from "react";
import BlockList from "./BlockList";
import isHotkey from "is-hotkey";
import {Dispatch} from "redux";
import {HintUpdateCommand} from "../../../../../redux/commands/slatejs/hint/HintUpdateCommand";
import {BlockTypeCodeBlock} from "../code/CodePlugin";


export function getSelectionCoords() {
    let sel = document.getSelection(), range, rect;
    if (sel && sel.rangeCount) {
        range = sel.getRangeAt(0).cloneRange();
        if (range.getClientRects) {
            range.collapse(true);
            if (range.getClientRects().length > 0) {
                rect = range.getClientRects()[0];
                return {
                    left: rect.left,
                    top: rect.top,
                    right: rect.right,
                    bottom: rect.bottom,
                };
            }
        }
    }
    return {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    };
}

export default function createHintPlugin(dispatch: Dispatch<any>): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (!isHotkey('meta+/', event.nativeEvent)) {
                return next();
            }

            const {left: x, top: y} = getSelectionCoords();

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