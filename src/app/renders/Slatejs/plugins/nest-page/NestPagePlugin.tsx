import {Plugin} from 'slate-react';
import React from "react";
import {DecorationJSON} from "slate";
import PostDropHolder from "./PostDropHolder";
import RenderNestPage from "./RenderNestPage";

export const BlockTypeNestPage = 'block-nest-page';

export function createNestPagePlugin(): Plugin {
    return {
        schema: {
            blocks: {
                [BlockTypeNestPage]: {
                    isVoid: true,
                }
            }
        },
        renderBlock: (props, editor, next) => {
            const {node} = props;
            if (node.type !== BlockTypeNestPage) {
                return next();
            }

            return <RenderNestPage editor={editor} props={props}/>
        },
        renderEditor: (props, editor, next) => {
            return <PostDropHolder editor={editor}>
                {next()}
            </PostDropHolder>
        },
        decorateNode: (node, editor, next) => {
            const decoration: DecorationJSON = {

            }
        }
    }
}