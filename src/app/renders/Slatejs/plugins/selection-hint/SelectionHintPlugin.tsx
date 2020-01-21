import {Plugin} from 'slate-react';
import React from "react";
import {getSelectionCoords} from "../hint/HintPlugin";
import SelectionToolbar from "./SelectionToolbar";
import {Dispatch} from "redux";
import {ToolsHintToggleCommand} from "../../../../../redux/commands/slatejs/tools-hint/ToolsHintToggleCommand";
import {ToolsHintUpdateCommand} from "../../../../../redux/commands/slatejs/tools-hint/ToolsHintUpdateCommand";
import {createTools, Tool} from "./tools";
import isHotkey from "is-hotkey";
import {GetState} from "../../SlatejsRender";


export default function createSelectionHintPlugin(getState: GetState, dispatch: Dispatch<any>): Plugin {
    const tools = createTools(getState, dispatch)
        .filter(t => t !== "Separator")
        .map(t => t as Tool)
        .filter(t => t.hotkey != null);

    return {
        onKeyDown: (event, editor, next) => {
            if (isHotkey('escape', event.nativeEvent)) {
                setTimeout(() => {
                    dispatch(new ToolsHintToggleCommand(false));
                }, 100);
                return;
            }

            for (let tool of tools) {
                if (isHotkey(tool.hotkey as string, event.nativeEvent)) {
                    tool.action(editor);
                    return;
                }
            }
            next();
        },
        onClick: (event, editor, next) => {
            // not select a range
            if (editor.value.selection.isCollapsed) {
                next();
                return;
            }

            const {left: x, bottom: y} = getSelectionCoords();

            next();

            setTimeout(() => {
                dispatch(new ToolsHintUpdateCommand({
                    show: !editor.value.selection.isCollapsed,
                    x, y
                }));
            }, 100)
        },
        onSelect: (event, editor, next) => {
            // not select a range
            if (editor.value.selection.isCollapsed) {

                setTimeout(() => {
                    dispatch(new ToolsHintToggleCommand(false));
                }, 100);
                next();
                return;
            }

            const {left: x, bottom: y} = getSelectionCoords();

            next();

            setTimeout(() => {
                dispatch(new ToolsHintUpdateCommand({
                    show: !editor.value.selection.isCollapsed,
                    x, y
                }));
            }, 100)
        },

        renderEditor: (props, editor, next) => {
            return <>
                <SelectionToolbar editor={editor}/>
                {next()}
            </>
        },
    }
}