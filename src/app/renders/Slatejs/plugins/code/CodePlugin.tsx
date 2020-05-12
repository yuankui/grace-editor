import {Plugin} from 'slate-react';
import React from "react";
import {ToggleBlockOnPrefix} from "../common";
import isHotkey from "is-hotkey";
import {decorateNode} from "./decorateNode";
import {renderDecoration} from "./renderDecoration";

export const BlockTypeCodeBlock = 'code-block';

export function createCodePlugin(): Plugin {
    return {
        decorateNode: (node, editor, next) => {
            if (node.object == 'block' && node.type == BlockTypeCodeBlock) {
                return decorateNode(node);
            }
            return next();
        },
        renderMark: (props, editor, next) => {
            const node = props.node;
            const ancestors = editor.value.document.getAncestors(node.key);
            if (ancestors && ancestors.some(a => {
                if (a == null) return false;
                if (a.object != 'block') return false;
                return a.type == BlockTypeCodeBlock;

            })) {
                return props.children
            }

            if (node.object == 'block' && node.type == BlockTypeCodeBlock) {
                return props.children;
            }
            return next();
        },
        renderDecoration: (props, editor, next) => {
            return renderDecoration(props, editor, next);
        },
        onKeyDown: (event, editor, next) => {
            if (ToggleBlockOnPrefix('^', event, editor, () => {
                editor.setBlocks(BlockTypeCodeBlock);
            })) return;

            if (editor.value.focusBlock.type != BlockTypeCodeBlock) {
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
            if (isHotkey('shift+enter', event.nativeEvent)) {
                editor.insertBlock('paragraph');
                event.preventDefault();
                return;
            }
            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type == BlockTypeCodeBlock) {
                return <pre className={BlockTypeCodeBlock} {...props.attributes}>{props.children}</pre>;
            } else {
                return next();
            }
        },
    }
}