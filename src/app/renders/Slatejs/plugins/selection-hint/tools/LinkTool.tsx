import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {InlineTypeLink} from "../../link/LinkPlugin";
import {LinkUpdateCommand} from "../../../../../../redux/commands/slatejs/link/LinkUpdateCommand";
import {GetState} from "../../../SlatejsRender";
import {Dispatch} from "redux";

export default function createLinkTool(getState: GetState, dispatch: Dispatch<any>): Tool {
    return {
        hint: 'Link',
        isActive(editor: Editor): boolean {
            const {focus, anchor} = editor.value.selection;
            const inlines = editor.value.document.getInlinesAtRange({
                focus,
                anchor,
            });
            const active = inlines != null && inlines.toArray()
                .some(m => m && m.type === InlineTypeLink);
            return active;
        },
        title: <u>Link</u>,
        hotkey: 'meta+l',

        action(editor: Editor): void {

            dispatch(new LinkUpdateCommand({
                show: true,
                url: '',
                linkKey: '',
            }))
        }
    }
}