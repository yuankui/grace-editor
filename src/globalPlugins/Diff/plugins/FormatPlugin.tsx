import {Plugin} from 'slate-react';
import React from "react";
import Corner, {CornerAction} from "../component/Corner";
import {message} from "antd";
import {
    QUERY_GET_CONTENT,
    COMMAND_SET_CONTENT
} from "./LinePlugin";

export function createFormatPlugin(): Plugin {
    return {
        renderEditor: (props, editor, next) => {
            if (props.readOnly) {
                return next();
            }
            const actions: Array<CornerAction> = [
                {
                    title: 'Json格式化',
                    callback(hide): void {
                        const content = editor.query(QUERY_GET_CONTENT);
                        try {
                            const json = JSON.parse(content);
                            const formatted = JSON.stringify(json, null, 2);
                            editor.command(COMMAND_SET_CONTENT, formatted);
                            message.info("formatting complete");
                        } catch (e) {
                            console.error(e);
                            message.error("error formatting:" + e.toString());
                        }
                        hide();
                    }
                },
            ];
            return <Corner className={'format-wrapper'} title={'格式化'} actions={actions}>
                {next()}
            </Corner>
        },

    }
}