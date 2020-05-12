import {RenderDecorationProps, Editor} from "slate-react";
import React from "react";

export function renderDecoration(props: RenderDecorationProps, editor: Editor, next: () => any) {
    const {children, decoration, attributes} = props;


    switch (decoration.type) {
        case 'comment':
            return <span {...attributes} className='code-comment'>{children}</span>;
        case 'keyword':
            return <span {...attributes} className='code-keyword'>{children}</span>;
        case 'tag':
            return <span {...attributes} className='code-tag'>{children}</span>;
        case 'punctuation':
            return <span {...attributes} className='code-punctuation'>{children}</span>;
        default:
            return next()
    }
}