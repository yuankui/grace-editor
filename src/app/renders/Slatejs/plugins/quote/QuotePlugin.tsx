import {Plugin} from 'slate-react';
import React from "react";
import {ToggleBlockOnPrefix} from "../common";
import isHotkey from "is-hotkey";

export const QuoteBlockType = 'quote-block';

export function createQuotePlugin(): Plugin {
    return {
        onKeyDown: (event, editor, next) => {
            if (ToggleBlockOnPrefix('>', event, editor, () => {
                editor.setBlocks(QuoteBlockType);
            })) return;

            if (editor.value.focusBlock.type != QuoteBlockType) {
                next();
                return;
            }

            if (isHotkey('enter', event.nativeEvent)) {
                editor.insertText("\n");
                event.preventDefault();
                return;
            }

            if (isHotkey('tab', event.nativeEvent)) {
                editor.insertText('    ');
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type == QuoteBlockType) {
                return <blockquote className={QuoteBlockType} {...props.attributes}>{props.children}</blockquote>;
            } else {
                return next();
            }
        },
    }
}