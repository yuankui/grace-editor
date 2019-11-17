import {Plugin} from 'slate-react';
import React from "react";
import InputButton from "../../../TopBar/InputButton";

export default function createTestPlugin(): Plugin {
    return {
        renderEditor: (props, editor, next) => {
            return <>
                <div>
                    <InputButton onConfirm={message => {
                        editor.wrapBlock(message);
                    }}>
                        Wrap
                    </InputButton>
                    <InputButton onConfirm={message => {
                        const ret = editor.query('isInBlock', message);
                        console.log('is-in-block', ret);
                    }}>isInBlock</InputButton>
                </div>
                {next()}
            </>
        }
    }
}