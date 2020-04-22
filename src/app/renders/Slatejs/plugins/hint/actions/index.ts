import {ReactNode} from "react";
import {Editor} from "slate-react";

export interface HintAction {
    icon(width: number): ReactNode,
    title(): string,
    subtitle(): string,
    action?(editor: Editor): void,
    modal?(editor: Editor, hide: () => void): ReactNode,
    key: string,
}