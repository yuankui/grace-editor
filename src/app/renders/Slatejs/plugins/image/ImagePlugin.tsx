import {Plugin} from 'slate-react';
import React from "react";
import {BlockTypeCodeBlock} from "../code/CodePlugin";
import {ImageBlock} from "./ImageBlock";
import isHotkey from "is-hotkey";
import {GetState} from "../../SlatejsRender";
import {COMMAND_PASTE_FILE} from "../../paste/copyPaste";

export const ImageBlockType = 'image-block';

function insertImage(editor, param, target) {
    if (target) {
        editor.select(target)
    }

    editor.insertBlock({
        type: ImageBlockType,
        data: {
            imageId: param.imageId,
        },
    })
}

export function createImagePlugin(getState: GetState): Plugin {
    return {
        schema: {
            blocks: {
                'image-block': {
                    isVoid: true,
                },
            }
        },

        onKeyDown: (event, editor, next) => {
            if (editor.value.focusBlock.type != ImageBlockType) {
                next();
                return;
            }

            if (isHotkey('enter', event.nativeEvent)) {
                editor.insertBlock('paragraph');
                event.preventDefault();
                return;
            }

            next();
        },
        // 不用commands: {},因为这里面不能使用next()
        onCommand: (command, editor, next) => {
            if (command.type != COMMAND_PASTE_FILE) {
                return next();
            }

            // 如果在code里面，就不处理
            if (editor.value.focusBlock.type == BlockTypeCodeBlock) {
                return next();
            }


            const files = command.args[0] as Array<DataTransferItem>;

            async function processFiles(files: Array<DataTransferItem>) {
                for (let f of files) {
                    const file = f.getAsFile();

                    if (file == null) continue;

                    let params = new URLSearchParams(getState().router.location.search);
                    const currentPostId = params.get('postId');
                    let imageId = await getState().backend.saveImage(file, currentPostId as string);

                    editor.command(insertImage, {
                        imageId: imageId,
                    });
                }
            }

            processFiles(files);
        },

        renderBlock: (props, editor, next) => {
            const {attributes, node, isFocused} = props;

            if (node.type === ImageBlockType) {
                const imageId = node.data.get('imageId');
                // <ImageBlock attributes={attributes} imageId={imageId} isFocused={isFocused}/>
                // <img {...attributes} src='https://www.baidu.com/img/bd_logo1.png?where=super' />
                return (
                    <ImageBlock attributes={attributes} imageId={imageId} isFocused={isFocused}/>
                );
            }

            return next();
        },
    }
}