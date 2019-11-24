import {Plugin} from 'slate-react';
import {Block, Text} from "slate";
import {List} from 'immutable';
import isHotkey from "is-hotkey";
import React from "react";
import {BlockParagraph} from "../common";

export const CommandToggleTable = 'command-toggle-table';
export const BlockTypeTable = 'block-type-table';

export const BlockTypeTableTr = 'block-type-table-tr';
export const BlockTypeTablePrefix = 'block-type-table-prefix';
export const BlockTypeTableTd = 'block-type-table-td';

export function createTablePlugin(): Plugin {
    return {
        schema: {
            blocks: {
                [BlockTypeTable]: {
                    // isVoid: true,
                    isAtomic: true,
                }
            }
        },
        onKeyDown: (event, editor, next) => {
            if (isHotkey('meta+t', event.nativeEvent)) {
                editor.command(CommandToggleTable, {row: 4, column: 4});
                return;
            }

            // 换行
            if (isHotkey('shift+enter', event.nativeEvent)) {
                const block = editor.value.focusBlock;
                if (block == null) {
                    next();
                    return;
                }

                const document = editor.value.document;
                const ancestors = document.getAncestors(block.key);

                if (ancestors == null) {
                    next();
                    return;
                }


                const topBlock = ancestors.take(2)
                    .last();

                let index = document.nodes.size;

                document.nodes.forEach((n, i) => {
                    if (n == null || i == null) {
                        return;
                    }
                    if (n.key === topBlock.key) {
                        index = i
                    }
                });

                const newBlock = Block.create({
                    type: BlockParagraph,
                    nodes: List([
                       Text.create('')
                    ])
                    // key: KeyUtils.create(),
                });

                editor.insertNodeByPath(List(), index + 1, newBlock)
                    .moveAnchorToStartOfNode(newBlock)
                    .moveFocusToStartOfNode(newBlock);

                return;
            }

            next();
        },
        commands: {
            [CommandToggleTable]: (editor, {column, row}) => {

                let trNodes = List<Block>();
                for (let i = 0; i < column; i++) {
                    // create tds
                    let tdNodes = List<Block>();
                    for (let j = 0; j < row; j++) {
                        const td = Block.create({
                            type: BlockTypeTableTd,
                            nodes: List([Block.create({
                                type: BlockParagraph,
                                text: '',
                            })])
                        });
                        tdNodes = tdNodes.push(td);
                    }

                    // add tds to tr
                    const tr = Block.create({
                        type: BlockTypeTableTr,
                        data: {
                            column,
                        },
                        nodes: tdNodes,
                    });
                    trNodes = trNodes.push(tr);
                }

                const tableBlock = Block.create({
                    type: BlockTypeTable,
                    data: {
                        column,
                        row,
                    },
                    nodes: trNodes,
                });
                editor.insertBlock(tableBlock);
                return editor;
            }
        },
        renderBlock: (props, editor, next) => {
            const {node, attributes, children} = props;

            if (node.type === BlockTypeTable) {
                return <div className='editor-table'>
                    <table {...attributes}>
                        <tbody>{children}</tbody>
                    </table>
                </div>;
            } else if (node.type === BlockTypeTableTr) {
                return <tr {...attributes}>{children}</tr>
            } else if (node.type === BlockTypeTableTd) {
                return <td {...attributes}>{children}</td>;
            } else if (node.type === BlockTypeTablePrefix) {
                return <div {...attributes}>1</div>
            }

            return next();
        }
    }
}