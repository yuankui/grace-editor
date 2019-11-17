import {Plugin} from 'slate-react';
import React from "react";

export const MarkTypeBold = 'inline-type-bold';
export const MarkTypeItalic = 'inline-type-italic';
export const MarkTypeUnderline = 'inline-type-underline';
export const MarkTypeLineThrough = 'inline-type-line-through';
export const MarkTypeCode = 'inline-type-code';

export const InlineMarkTypes = [
    MarkTypeBold,
    MarkTypeItalic,
    MarkTypeUnderline,
    MarkTypeCode,
    MarkTypeLineThrough,
];

export default function createInlinePlugin(): Plugin {
    return {
        renderMark: (props, editor, next) => {
            const {node, mark, attributes} = props;

            if (InlineMarkTypes.findIndex(e => e === mark.type) >= 0) {
                return <span {...attributes} className={mark.type}>{next()}</span>
            }

            return next();
        }
    }
}