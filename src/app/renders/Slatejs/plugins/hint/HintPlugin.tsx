import {Plugin} from 'slate-react';
import React from "react";
import BlockList from "./BlockList";
import isHotkey from "is-hotkey";

export interface OnHintChange {
    (x: number, y: number, show: boolean): void;
}

function getSelectionCoords() {
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

export default function createHintPlugin(onHintChange: OnHintChange): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (!isHotkey('/', event.nativeEvent)) {
                return next();
            }

            const {x, y} = getSelectionCoords();
            const el = document.getElementById('demo');
            if (el) {
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
            }
            next();
        },
        renderEditor: (props, editor, next) => {
            return <div>
                <BlockList/>
                {next()}
            </div>
        }
    }
};