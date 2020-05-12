import {Plugin} from 'slate-react';
import React from "react";
import {ToggleBlockOnPrefix} from "../common";
import CodeBlock from "./CodeBlock";

export const BlockTypeCodeBlock = 'code-block';

export function createCodePlugin(): Plugin {
    return {
        schema: {
            blocks: {
                [BlockTypeCodeBlock]: {
                    // isAtomic: true,
                    isVoid: true,
                }
            }
        },
        onKeyDown: (event, editor, next) => {
            if (ToggleBlockOnPrefix('^', event, editor, () => {
                editor.setBlocks(BlockTypeCodeBlock);
            })) return;

            if (editor.value.focusBlock.type != BlockTypeCodeBlock) {
                next();
                return;
            }

            next();
        },

        renderBlock: (props, editor, next) => {
            if (props.node.type != BlockTypeCodeBlock) {
                return next();
            }

            return <CodeBlock props={props} editor={editor}/>
        },
    }
}