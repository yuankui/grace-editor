import {Plugin} from 'slate-react';
import React from "react";
import {BlockTypeCodeBlock} from "../code/CodePlugin";
import {ImageBlock} from "./ImageBlock";
import isHotkey from "is-hotkey";
import {GetState} from "../../SlatejsRender";
import {ClipboardData, Serde} from "../../serde";

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

export function createImagePlugin(getState: GetState): Plugin & Serde {
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
        paste: (data, editor) => {
            // 如果在code里面，就不处理
            if (editor.value.focusBlock.type == BlockTypeCodeBlock) {
                return data;
            }

            const files = [] as Array<ClipboardData>;
            const remain = [] as Array<ClipboardData>;

            for (let item of data) {
                if (item.type.toLowerCase() === 'files') {
                    files.push(item);
                } else {
                    remain.push(item);
                }
            }

            async function processFiles(files: Array<ClipboardData>) {
                for (let f of files) {
                    const file = f.item.getAsFile();

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

            return remain;
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