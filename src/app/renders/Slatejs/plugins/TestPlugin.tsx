import {Plugin} from 'slate-react';
import React from "react";

export default function createTestPlugin(): Plugin {
    return {
        renderEditor: (props, editor, next) => {
            return <>

            </>
        }
    }
}