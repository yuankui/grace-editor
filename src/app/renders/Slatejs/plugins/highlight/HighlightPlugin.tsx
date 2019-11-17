import {Plugin} from 'slate-react';
import isHotkey from "is-hotkey";
import React from "react";

const HighlightMarkType = 'highlight-mark';


export default function createHighlightPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (isHotkey('meta+m', event.nativeEvent)) {
                editor.toggleMark(HighlightMarkType);
                event.preventDefault();
                return;
            }

            next();
        },
        renderMark: (props, editor, next) => {
            const {children, mark, attributes} = props;

            if (mark.type === HighlightMarkType) {
                return <span className={HighlightMarkType} {...attributes}>{children}</span>;
            }

            return next();
        }
    };
};