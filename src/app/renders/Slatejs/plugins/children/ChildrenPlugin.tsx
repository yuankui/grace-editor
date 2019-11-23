import {Plugin} from 'slate-react';
import React from "react";
import {GetState} from "../../SlatejsRender";
import {PostLink} from "./PostLink";
import {BlockParagraph} from "../common";

export const BlockTypeChildren = 'block-type-children';
export const CommandToggleChildren = 'command-toggle-children';

export default function createChildrenPlugin(getState: GetState): Plugin {
    return {
        schema: {
            blocks: {
                [BlockTypeChildren]: {
                    isVoid: true,
                }
            }
        },

        commands: {
            [CommandToggleChildren]: (editor, args) => {
                const postId = getState().posts.currentPostId;

                editor.setBlocks({
                    type: BlockTypeChildren,
                    data: {
                        parentId: postId,
                    }
                })
                    .insertBlock(BlockParagraph);

                return editor;
            },
        },
        renderBlock: (props, editor, next) => {
            const {node, attributes, isFocused} = props;
            if (node.type !== BlockTypeChildren) {
                return next();
            }

            const parentId = node.data.get("parentId");
            const state = getState();

            const children = state.posts.childrenMap.get(parentId);
            const list = children.map(postId => {
                return <li key={postId}>
                    <PostLink title='missing' postId={postId}/>
                </li>;
            });

            const c = list.length === 0 ? <li>Empty Children</li> : list;
            return <ul {...attributes} className={'app-children-block ' + 'focus-' + isFocused}>
                {c}
            </ul>;
        },
    }
}