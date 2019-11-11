import {Plugin} from 'slate-react';
import React from "react";
import {CodeBlock} from "../code/CodePlugin";
import {AppStore} from "../../../../../redux/store";
import ImageBlock from "./ImageBlock";
import isHotkey from "is-hotkey";

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

export function createImagePlugin(store: AppStore): Plugin {
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
        onPaste: async (event, editor, next) => {
            // 如果在code里面，就不处理
            if (editor.value.focusBlock.type == CodeBlock) {
                next();
                return;
            }

            event.preventDefault();
            const files = event.clipboardData.files;

            for (let i = 0; i < files.length; i++) {
                const file = files.item(i);
                if (file == null) continue;

                let imageId = await store.backend.saveImage(file, store.posts.currentPostId as string);

                editor.command(insertImage, {
                    imageId: imageId,
                });
            }

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