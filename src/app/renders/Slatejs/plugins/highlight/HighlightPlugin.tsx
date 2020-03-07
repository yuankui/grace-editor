import {Plugin} from 'slate-react';
import isHotkey from "is-hotkey";
import React from "react";
import {GetState} from "../../SlatejsRender";

export const HighlightMarkType = 'highlight-mark';
export const ToggleColorCommand = 'toggle-highlight-color';
export const RemoveColorCommand = 'remove-highlight-color';

export interface HLColor {
    color: string,
    background: string,
}

export default function createHighlightPlugin(getState: GetState): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (isHotkey('mod+m', event.nativeEvent)) {
                const state = getState();
                editor.command(HighlightMarkType, state.slatejs.highlight.color);
                event.preventDefault();
                return;
            }

            next();
        },
        renderMark: (props, editor, next) => {
            const {children, mark, attributes} = props;

            const color = mark.data.get('color');
            const background = mark.data.get('background');

            if (mark.type === HighlightMarkType) {
                return <span style={{
                    backgroundColor: background,
                    color: color,
                }} className={HighlightMarkType} {...attributes}>{children}</span>;
            }

            return next();
        },
        commands: {
            [ToggleColorCommand]: (editor, args) => {
                const color = args as HLColor;

                editor.command(RemoveColorCommand)
                    .toggleMark({
                    type: HighlightMarkType,
                    data: {
                        color: color.color,
                        background: color.background,
                    }
                });
                return editor;
            },
            [RemoveColorCommand]: (editor) => {
                const marks = editor.value.document.getActiveMarksAtRange(editor.value.selection.toRange());
                for (let mark of marks.toArray()) {
                    if (mark.type == HighlightMarkType)
                        editor.removeMark(mark);
                }
                return editor;
            }
        },
    };
};