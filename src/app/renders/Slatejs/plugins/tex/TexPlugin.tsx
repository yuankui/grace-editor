import {Plugin} from "slate-react";
import TexBlock from "./TexBlock";
import React from "react";

export const BlockTex = 'block-tex';

/**
 * 公式
 */
export function createTexPlugin(): Plugin {
    return {
        schema: {
            blocks: {
                [BlockTex]: {
                    // isAtomic: true,
                    isVoid: true,
                }
            }
        },
        renderBlock: (props, editor, next) => {
            const {node} = props;
            if (node.type != BlockTex) {
                return next();
            }

            return <TexBlock props={props} editor={editor} />
        }
    }
}