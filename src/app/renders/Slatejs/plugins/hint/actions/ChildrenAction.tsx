import {HintAction} from "./index";
import React, {ReactNode} from "react";
import {CommandToggleChildren} from "../../children/ChildrenPlugin";

export default class ChildrenAction implements HintAction {
    action(editor): void {
        editor.command(CommandToggleChildren);
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/todo
        return <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 30 30">
            <path
                d="M 5 4 C 3.895 4 3 4.895 3 6 L 3 8 C 3 9.105 3.895 10 5 10 L 7 10 L 7 23 A 1.0001 1.0001 0 0 0 8 24 L 17 24 C 17 25.105 17.895 26 19 26 L 25 26 C 26.105 26 27 25.105 27 24 L 27 22 C 27 20.895 26.105 20 25 20 L 19 20 C 17.895 20 17 20.895 17 22 L 9 22 L 9 16 L 17 16 C 17 17.105 17.895 18 19 18 L 25 18 C 26.105 18 27 17.105 27 16 L 27 14 C 27 12.895 26.105 12 25 12 L 19 12 C 17.895 12 17 12.895 17 14 L 9 14 L 9 10 L 11 10 C 12.105 10 13 9.105 13 8 L 13 6 C 13 4.895 12.105 4 11 4 L 5 4 z"></path>
        </svg>;
    }

    subtitle(): string {
        return "Track the children post dynamically";
    }

    title(): string {
        return "Child Posts";
    }

    key: string = this.title();
}