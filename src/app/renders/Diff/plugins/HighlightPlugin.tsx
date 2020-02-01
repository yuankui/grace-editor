import {Plugin} from "slate-react";
import * as Prism from "prismjs";
import React from "react";
import {DecorationJSON} from "slate";
import 'prismjs/components/prism-json';


export function createHighlightPlugin(): Plugin {
    return {
        decorateNode: (node, editor, next) => {
            const others = next() || [];
            if (node.object !== 'document') return others;

            const language = 'json';
            const texts = Array.from(node.texts({}));
            const string = texts.map(([n]) => n.text).join('\n');
            const grammar = Prism.languages[language];
            const tokens = Prism.tokenize(string, grammar);
            const decorations = [] as Array<DecorationJSON>;
            let startEntry = texts.shift();
            let endEntry = startEntry;
            let startOffset = 0;
            let endOffset = 0;
            let start = 0;

            const log = tokens.filter(t => typeof t != 'string')
                .map(t => t as Prism.Token)
                .map(t => [t.type, t.content]);

            console.log(tokens);
            for (const token of tokens) {
                startEntry = endEntry;
                startOffset = endOffset;

                const [startText, startPath] = startEntry as any;
                const content = getContent(token);
                const newlines = content.split('\n').length - 1;
                const length = content.length - newlines;
                const end = start + length;

                let available = startText.text.length - startOffset;
                let remaining = length;

                endOffset = startOffset + remaining;

                while (available < remaining && texts.length > 0) {
                    endEntry = texts.shift();
                    const [endText] = endEntry as any;
                    remaining = length - available;
                    available = endText.text.length;
                    endOffset = remaining;
                }

                const [endText, endPath] = endEntry as any;

                if (typeof token !== 'string') {
                    const dec: DecorationJSON = {
                        type: 'code-highlight',
                        anchor: {
                            key: startText.key,
                            path: startPath,
                            offset: startOffset,
                        },
                        focus: {
                            key: endText.key,
                            path: endPath,
                            offset: endOffset,
                        },
                        data: {
                            type: token.type
                        }
                    };

                    decorations.push(dec);
                }

                start = end;
            }

            return [...others, ...decorations]
        },
        renderDecoration: (props, editor, next) => {
            const {children, decoration, attributes} = props;

            if (decoration.type == 'code-highlight') {
                return <span {...attributes} className={'code-' + decoration.data.get('type')}>
                    {children}
                </span>
            }

            return next();
        }
    }
}

function getContent(token) {
    if (typeof token === 'string') {
        return token
    } else if (typeof token.content === 'string') {
        return token.content
    } else {
        return token.content.map(getContent).join('')
    }
}