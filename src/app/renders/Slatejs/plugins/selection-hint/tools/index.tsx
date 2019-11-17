import React, {ReactNode} from "react";
import {Editor} from "slate";
import createBoldTool from "./BoldTool";
import createItalicTool from "./ItalicTool";
import createLineThroughTool from "./LineThroughTool";
import createCodeTool from "./CodeTool";
import createUnderLineTool from "./UnderLineTool";
import createResetTool from "./ResetTool";

export interface Tool {
    title: ReactNode,
    hotkey?: string,
    markType: string,
    action(editor: Editor): void,
}

export type ToolOrSeparator = Tool | "Separator";

// return groups of tools
export function createTools(): Array<ToolOrSeparator> {
    return [
        createResetTool(),
        "Separator",
        createBoldTool(),
        createItalicTool(),
        createLineThroughTool(),
        createUnderLineTool(),
        "Separator",
        createCodeTool(),
    ]
}