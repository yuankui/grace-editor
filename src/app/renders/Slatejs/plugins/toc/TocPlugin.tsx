// toc(table of content)

import {Plugin} from 'slate-react';
import TableOfContent from "./TableOfContent";
import React from "react";

export function createTocPlugin(): Plugin {
    return {
        renderEditor: (props, editor, next) => {
            if (props.readOnly) {
                return next();
            }
            return <div style={{height: '100%'}} className='app-toc-container'>
                <TableOfContent value={editor.value}/>
                {next()}
            </div>
        }
    }
}