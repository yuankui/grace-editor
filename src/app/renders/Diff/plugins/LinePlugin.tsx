import {Plugin} from "slate-react";
import React from "react";
import {Node} from "slate";

export const BlockCodeLine = "block-code-line";

export function createLinePlugin(): Plugin {
    return {
        schema: {
            // document 下面只能时一行一行的
            document: {
                nodes: [
                    {
                        match: [
                            {type: BlockCodeLine},
                        ]
                    }
                ]
            }
        },
        shouldNodeComponentUpdate: (previousProps, props, editor, next) => {
            const node = props['node'] as Node;
            if (node.object == "block" && node.type == BlockCodeLine) {
                return true;
            }
            return next();
        },
        renderBlock: (props, editor, next) => {
            if (props.node.type !== BlockCodeLine) {
                return next();
            }

            const path = editor.value.document.assertPath(props.node.key);
            const index = path.last();

            const diffLine = !!props.node.data.get("diff");
            return <div className={
                'code-line ' + 'diff-' + diffLine
            } {...props.attributes}>
                <div className='line-number' contentEditable={false}>
                    <div className='number'>{index}</div>
                </div>
                {props.children}
            </div>;
        },
    }
}