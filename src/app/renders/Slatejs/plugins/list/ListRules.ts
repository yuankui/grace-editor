import {Block, Rules} from "slate";
import {
    BlockTypeBulletedList,
    BlockTypeListItem,
    BlockTypeNumberedList
} from "./ListPlugin";

export const ListRules: Rules = {
    nodes: [
        {
            min: 1,
            match: [
                {type: BlockTypeListItem},
                {type: BlockTypeBulletedList},
                {type: BlockTypeNumberedList},
            ]
        }
    ],
    normalize: (editor, error) => {
        if (error.code === "child_type_invalid") {
            const child: Block = error.child;

            // 创建一个新的list-item，将这个block包住
            const wrapItem = Block.create({
                type: BlockTypeListItem,
                nodes: [
                    child
                ],
                object: "block",
            });

            const childPath = editor.value.document.assertPath(child.key);

            console.log('before', editor.value.toJS());
            editor.setNodeByPath(childPath, wrapItem);
            console.log('after', editor.value.setNode(childPath, wrapItem).toJS());

            // editor.insertBlock(newNode as Block);
        }
        console.log(error);
    }
};