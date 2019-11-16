import {ReactNode} from "react";
import {Editor} from "slate";

export interface HintAction {
    icon(width: number): ReactNode,
    title(): string,
    subtitle(): string,
    action(editor: Editor): void,
    key: string,
}