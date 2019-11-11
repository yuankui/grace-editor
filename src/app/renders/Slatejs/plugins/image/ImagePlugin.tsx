import {Plugin} from 'slate-react';
import React from "react";
import {CodeBlock} from "../code/CodePlugin";
import Draft, {EditorState} from "draft-js";
import Immutable from "immutable";

const ImageBlock = 'image-block';

function insertImage(editor, param, target) {
    if (target) {
        editor.select(target)
    }

    editor.insertBlock({
        type: 'image',
        data: {
            src: param.url,
            size: param.size,
        },
    })
}

export function createImagePlugin(): Plugin {
    return {
        onPaste: (event, editor, next) => {
            // 如果在code里面，就不处理
            if (editor.value.focusBlock.type == CodeBlock) {
                next();
                return;
            }

            if (1 == 1) {
                const files = event.clipboardData.files;

                for (let i = 0; i < files.length; i++) {
                    const file = files.item(i);
                    if (file == null) continue;

                    let reader = new FileReader();
                    reader.onload = async () => {
                        const url: any = reader.result;
                        if (url == null) {
                            return;
                        }

                        const size = await getImageSize(url);

                        editor.command(insertImage, {
                            src: url,
                            size: size,
                        });
                    };

                    // read file
                    reader.readAsDataURL(file);
                }


                return;
            }
        },

        renderBlock: (props, editor, next) => {
            const {attributes, node, isFocused} = props;

            if (node.type === ImageBlock) {
                const src = node.data.get('src');
                return (
                    <img
                        {...attributes}
                        src={src}
                        className={ImageBlock + " " + 'focus-' + isFocused}
                    />
                );
            }

            return next();
        },
    }
}

/**
 * the hack way
 */
async function getImageSize(url: string): Promise<any> {
    let img = new Image();

    return new Promise((resolve, reject) => {
            img.onload = function (this: GlobalEventHandlers, ev: Event) {
                resolve({
                    width: img.width / 2,
                    height: img.height / 2,
                })
            };
            img.src = url;
        }
    );
}