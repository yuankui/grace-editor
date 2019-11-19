import React, {ReactNode} from "react";
import {Editor} from "slate";
import createBoldTool from "./BoldTool";
import createItalicTool from "./ItalicTool";
import createLineThroughTool from "./LineThroughTool";
import createCodeTool from "./CodeTool";
import createUnderLineTool from "./UnderLineTool";
import createResetTool from "./ResetTool";
import createHeadingTool from "./HeadingTool";
import createLinkTool from "./LinkTool";
import {GetState} from "../../../SlatejsRender";
import {Dispatch} from "redux";

export interface Tool {
    hint: string,
    title: ReactNode,
    hotkey?: string,
    isActive(editor: Editor): boolean,
    action(editor: Editor): void,
}

export type ToolOrSeparator = Tool | "Separator";

// return groups of tools
export function createTools(getState: GetState, dispatch: Dispatch<any>): Array<ToolOrSeparator> {
    return [
        createResetTool(),
        "Separator",
        createBoldTool(),
        createItalicTool(),
        createLineThroughTool(),
        createUnderLineTool(),
        "Separator",
        createCodeTool(),
        "Separator",
        createHeadingTool(1),
        createHeadingTool(2),
        createHeadingTool(3),
        "Separator",
        createLinkTool(getState, dispatch),
    ]
}