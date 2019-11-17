import {Plugin} from 'slate-react';
import React from "react";
import {getSelectionCoords} from "../hint/HintPlugin";
import SelectionToolbar from "./SelectionToolbar";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {ToolsHintToggleCommand} from "../../../../../redux/commands/tools-hint/ToolsHintToggleCommand";
import {ToolsHintUpdateCommand} from "../../../../../redux/commands/tools-hint/ToolsHintUpdateCommand";

export default function createSelectionHintPlugin(store: AppStore, dispatch: Dispatch<any>): Plugin {
    return {
        onSelect: (event, editor, next) => {
            // not select a range
            if (editor.value.selection.isCollapsed) {

                setTimeout(() => {
                    dispatch(new ToolsHintToggleCommand(false));
                }, 100);
                next();
                return;
            }

            const {x, y} = getSelectionCoords();

            next();

            setTimeout(() => {
                dispatch(new ToolsHintUpdateCommand({
                    show: true,
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