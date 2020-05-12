import {Block, DecorationJSON} from "slate";
import Prism from 'prismjs';

export function decorateNode(node: Block): Array<DecorationJSON> {
    const language = node.data.get('language') || "javascript";
    const texts = Array.from(node.texts({}));
    const string = texts.map(([n]) => n.text).join('\n');
    const grammar = Prism.languages[language];
    const tokens = Prism.tokenize(string, grammar);
    const decorations: Array<DecorationJSON> = [];
    let startEntry = texts.shift();
    if (startEntry == undefined) {
        return [];
    }
    let endEntry = startEntry;
    let startOffset = 0;
    let endOffset = 0;
    let start = 0;

    for (const token of tokens) {
        startEntry = endEntry;
        startOffset = endOffset;

        const [startText, startPath] = startEntry;
        const content = getContent(token);
        const newlines = content.split('\n').length - 1;
        const length = content.length - newlines;
        const end = start + length;

        let available = startText.text.length - startOffset;
        let remaining = length;

        endOffset = startOffset + remaining;

        while (available < remaining && texts.length > 0) {
            endEntry = texts.shift() as any;
            const [endText] = endEntry;
            remaining = length - available;
            available = endText.text.length;
            endOffset = remaining;
        }

        const [endText, endPath] = endEntry;

        if (typeof token !== 'string') {
            const dec: DecorationJSON = {
                type: token.type,
                anchor: {
                    key: startText.key,
                    path: startPath as any,
                    offset: startOffset,
                },
                focus: {
                    key: endText.key,
                    path: endPath as any,
                    offset: endOffset,
                },
            };

            decorations.push(dec);
        }

        start = end;
    }

    return decorations;
}

/**
 * A helper function to return the content of a Prism `token`.
 *
 * @param {Object} token
 * @return {String}
 */

function getContent(token) {
    if (typeof token === 'string') {
        return token;
    } else if (typeof token.content === 'string') {
        return token.content;
    } else {
        return token.content.map(getContent).join('');
    }
}