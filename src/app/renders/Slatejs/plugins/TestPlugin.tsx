import {Plugin} from 'slate-react';
import React from "react";
import InputButton from "../../../TopBar/InputButton";
import {Button} from "antd";
import {QueryListType} from "./list/ListPlugin";

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

                    <Button onClick={() => {
                        let query = editor.query(QueryListType);
                        console.log('list type', query);
                    }}>
                        QueryListType
                    </Button>
                </div>
                {next()}
            </>
        }
    }
}