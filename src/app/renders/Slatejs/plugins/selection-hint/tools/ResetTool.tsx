import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {InlineMarkTypes, MarkTypeBold} from "../../inline/InlinePlugin";

export default function createResetTool(): Tool {
    return {
        isActive(editor: Editor): boolean {
            return false;
        },
        title: <svg width="1em" height="1em" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <g id="cleaner-format" fill="none" fillRule="evenodd">
                <path
                    d="M13.64 38l-8.35-8.35a1 1 0 0 1 0-1.41L27.21 6.32a1 1 0 0 1 1.42 0l13.43 13.43a1 1 0 0 1 0 1.42L25.23 38H42v3H6v-3h7.64zm4.24 0h3.1l7.65-7.64-10.6-10.6-9.2 9.19L17.88 38z"
                    id="\u5F62\u72B6" fill="#000"></path>
            </g>
        </svg>,
        action(editor: Editor): void {
            let e = editor;
            for (let inlineMarkType of InlineMarkTypes) {
                e = e.removeMark(inlineMarkType);
            }
            e.setBlocks({
                type: 'paragraph',
                data: undefined,
            });
        }
    }
}