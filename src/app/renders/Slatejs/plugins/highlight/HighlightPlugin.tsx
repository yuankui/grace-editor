import {Plugin} from 'slate-react';
import isHotkey from "is-hotkey";
import React from "react";

const HighlightMarkType = 'highlight-mark';

const CodeMarkType = 'code-mark';

export default function createHighlightPlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (isHotkey('meta+m', event.nativeEvent)) {
                editor.toggleMark(HighlightMarkType);
                event.preventDefault();
                return;
            }

            if (isHotkey('meta+e', event.nativeEvent)) {
                editor.toggleMark(CodeMarkType);
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

            if (mark.type === CodeMarkType) {
                return <code className={CodeMarkType} {...attributes}>{children}</code>;
            }

            return next();
        }
    };
};