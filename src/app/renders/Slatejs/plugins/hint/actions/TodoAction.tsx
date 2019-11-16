import {HintAction} from "./index";
import React, {ReactNode} from "react";
import {Editor} from "slate";
import {TodoBlockType} from "../../todo/TodoPlugin";

export default class TodoAction implements HintAction {
    action(editor: Editor): void {
        editor.insertBlock(TodoBlockType);
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/todo
        return <img width={width} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACC0lEQVR4nO3cQW7CMBCF4XeJRu39b1LaFV2VShyHLgitCWMnTh3PQP9PshTIZpKR44Q8IQEAAAAAAAAAgAc3SHqTtB+34ehJ0qek0ziOkl5cK/rHBkkHnRtxmGwzUzpLZ8ZR0rPxHTOlk+nMGDL79v1Lu1+DpA/VL8SlZkz3lxryrt91J9LYVZyLZtYuxNZlqmZ/yvvEl0ZXaxfimpmxZFF3OfgZ3WtauxC3nBkXNETnNWNuIa7Zt2R/Dg1RviGSfWK3aoZEQyTVn+CtmiHRkB81TdmqGdL8wX+N47J9Sj6n3939XZa0rCl72c8oLZohMUNurPmZY83dVA4NMdQ0pWUzJP+Hv1CXrNSSS1Cry1RqJ/8Tb43XBsf2Z6WZ0npmYCGrKTTDGS+cArJ+CWZmOCs9hwDAnSOXFQi5rEC4TQ6EXFYg5LI2QC7LHuSyAo6uyGXlda+JXFZZ95rIZZWFaYhELktyqIlcVplLTXNrxpL3IS3eJNKQBLksm2tN5LJuuddELivAg+EUuazrQS4LNnJZAfHCKSByWQGRywLwwMhlBUIuKxBukwMhlxUIuawNkMuyB7msgKMrcll53Wsil1XWvaZHymVt+ec03ZDLKuteE7msMpeayGXludVELsvmWhO5rFvuNZHLCvBgOEUu63qQy4KNXFZAvHAKiFxWQOSyAAAAAAAAAACAt2/Fbx52UefdWwAAAABJRU5ErkJggg=="/>;
    }

    subtitle(): string {
        return "Track tasks with todo list";
    }

    title(): string {
        return "Todo List";
    }

    key: string = this.title();
}