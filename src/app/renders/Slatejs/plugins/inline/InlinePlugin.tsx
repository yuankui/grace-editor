import {Plugin} from 'slate-react';
import React from "react";

const typeMap = {
    bold: 'inline-bold',
    italic: 'inline-italic',
};

export default function createInlinePlugin(): Plugin {
    return {
        renderInline: (props, editor, next) => {
            const {node} = props;
            let nodeClass = typeMap[node.type];

            if (nodeClass) {
                return <span className={nodeClass}>{next()}</span>
            }

            return next();
        }
    }
}