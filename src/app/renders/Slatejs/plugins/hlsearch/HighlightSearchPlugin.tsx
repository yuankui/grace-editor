import {Plugin} from 'slate-react';
import {DecorationJSON, Text} from 'slate';
import {GetState} from "../../SlatejsRender";
import {List} from "immutable";
import React from "react";
import {SearchEditor} from "./SearchEditor";

const MarkHighlightSearch = 'mark-highlight-search';

export function createHighlightSearchPlugin(getState: GetState): Plugin {
    return {
        decorateNode: (node, editor, next) => {
            const ranges: Array<DecorationJSON> = [];
            const {text: search, show} = getState().slatejs.highlightSearch;
            if (search && show && Text.isText(node)) {
                const path = editor.value.document.getPath(node) as List<number>;
                const {text} = node;
                const parts = text.split(search);
                let offset = 0;

                parts.forEach((part, i) => {
                    if (i !== 0) {
                        const decoration: DecorationJSON = {
                            type: MarkHighlightSearch,
                            anchor: {path: path.toArray(), offset: offset - search.length},
                            focus: {path: path.toArray(), offset},
                        };

                        ranges.push(decoration);
                    }

                    offset = offset + part.length + search.length
                })
            }
            return ranges
        },

        renderDecoration: (props, editor, next) => {
            const {children, decoration, attributes} = props;
            if (decoration.type === MarkHighlightSearch) {
                return (
                    <span {...attributes} style={{backgroundColor: '#ffeeba'}}>
                        {children}
                    </span>
                )
            }
            return next();
        },

        renderEditor: (props, editor, next) => {
            return <SearchEditor>
                {next()}
            </SearchEditor>
        }
    }
}