import {Block, Text} from "slate";
import {BlockParagraph} from "../plugins/common";
import {List} from "immutable";

export function createEmptyParagraph() {
    const newBlock = Block.create({
        type: BlockParagraph,
        nodes: List([
            Text.create('')
        ])
        // key: KeyUtils.create(),
    });

    return newBlock;
}