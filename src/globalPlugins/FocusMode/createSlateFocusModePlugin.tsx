import {EditorPlugin} from "../../app/renders/Slatejs/plugins/EditorPlugin";
import React from "react";

export function createSlateFocusModePlugin(): EditorPlugin {
    return {
        name: "FocusModePlugin",

        renderBlock: (props, editor, next) => {
            const block = next();

            const currentPath = editor.value.document.getPath(props.node.key);
            if (currentPath?.size != 1) {
                // 非顶级Block
                return block;
            }

            const focusBlock = editor.value.focusBlock;
            if (focusBlock == null) {
                return block;
            }
            let focusPath = editor.value.document.getPath(focusBlock.key);

            const index = currentPath.first();


            if (focusPath?.first() === index) {
                // 当前block顶级path = focusBlock顶级path
                return <div {...props.attributes} className='focus-block'>
                    {block}
                </div>
            }
            return block;
        }
    }
}