import {Tool} from "./index";
import React from "react";
import {Editor} from "slate";
import {InlineTypeLink} from "../../link/LinkPlugin";
import {LinkUpdateCommand} from "../../../../../../redux/commands/slatejs/link/LinkUpdateCommand";
import {GetState} from "../../../SlatejsRender";
import {Dispatch} from "redux";

export default function createLinkTool(getState: GetState, dispatch: Dispatch<any>): Tool {
    return {
        isActive(editor: Editor): boolean {
            return editor.value.focusInline && editor.value.focusInline.type === InlineTypeLink;
        },
        title: <u>Link</u>,
        hotkey: 'meta+l',

        action(editor: Editor): void {
            dispatch(new LinkUpdateCommand({
                show: true,
                url: '',
            }))
        }
    }
}