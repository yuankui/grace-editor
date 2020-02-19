import {Plugin} from "slate-react";
import React from "react";
import {Block, BlockJSON, Document, InsertTextOperation, Node, Value} from "slate";
import {List} from "immutable";

export const BlockCodeLine = "block-code-line";
export const COMMAND_SET_CONTENT = 'command-set-content';
export const QUERY_GET_CONTENT = 'command-get-content';


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
        commands: {
            [COMMAND_SET_CONTENT]: (editor, args) => {
                const content = args as string;
                const lines = content.split("\n");

                const blockLines: Array<BlockJSON> = lines.map(line => {
                    const block: BlockJSON = {
                        object: 'block',
                        type: BlockCodeLine,
                        nodes: [
                            {
                                text: line,
                                object: 'text'
                            }
                        ]
                    };
                    return block;
                });

                const document = Document.fromJSON({
                    object: 'document',
                    nodes: blockLines,
                });


                const value = editor.value.set('document', document) as Value;
                editor.onChange({
                    operations: List.of(),
                    value,
                });
                return editor;
            },
        },
        queries: {
            [QUERY_GET_CONTENT]: editor => {
                const lines = editor.value.document.nodes.map(value => {
                    const blockLine: Block = value as Block;
                    return blockLine.text;
                }).join('\n');

                return lines;
            }
        }
    }
}