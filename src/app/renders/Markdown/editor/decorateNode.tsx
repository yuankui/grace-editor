import Prism from 'prismjs';
import {DecorationJSON, Editor, Node} from "slate";

Prism.languages.markdown = Prism.languages.extend("markup", {});
Prism.languages.insertBefore("markdown", "prolog", {
    blockquote: {
        pattern: /^>(?:[\t ]*>)*.+/m,
        alias: "punctuation",
        lookbehind: true,
    },
    code: [{
        pattern: /^(?: {4}|\t).+/m,
        alias: "keyword"
    },
        {
            pattern: /``.+?``|`[^`\n]+`/,
            alias: "keyword"
        }
    ],
    title: [
        {
            pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
            alias: "important",
            inside: {punctuation: /==+$|--+$/}
        },
        {
            pattern: /(^\s*)#+.+/m,
            lookbehind: !0,
            alias: "important",
            inside: {
                punctuation: /^#+|#+$/
            }
        }],
    hr: {pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation"},
    list: {
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: !0,
        alias: "punctuation"
    },
    "url-reference": {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
            variable: {pattern: /^(!?\[)[^\]]+/, lookbehind: !0},
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
        },
        alias: "url"
    },
    bold: {
        pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: {punctuation: /^\*\*|^__|\*\*$|__$/}
    },
    italic: {
        pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: {punctuation: /^[*_]|[*_]$/}
    },
    url: {
        pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
        inside: {
            variable: {pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0},
            string: {pattern: /"(?:\\.|[^"\\])*"(?=\)$)/}
        }
    }
}, null as any);

const markdown: any = Prism.languages.markdown;
markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url);
markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url);
markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);

export default function decorateNode(node: Node, editor: Editor, next) {

    const startTime = new Date();

    const others = next() || [];
    if (node.object !== 'block') return others;

    const string = node.text;
    const texts = Array.from(node.texts({}));
    const grammar = Prism.languages.markdown;
    const tokens = Prism.tokenize(string, grammar);
    const decorations: Array<DecorationJSON> = [];
    let startEntry = texts.shift();
    let endEntry = startEntry;
    let startOffset = 0;
    let endOffset = 0;
    let start = 0;

    function getLength(token) {
        if (typeof token === 'string') {
            return token.length
        } else if (typeof token.content === 'string') {
            return token.content.length
        } else {
            return token.content.reduce((l, t) => l + getLength(t), 0)
        }
    }

    for (const token of tokens) {
        startEntry = endEntry;
        startOffset = endOffset;

        const [startText, startPath] = startEntry as any;
        const length = getLength(token);
        const end = start + length;

        let available = startText.text.length - startOffset;
        let remaining = length;

        endOffset = startOffset + remaining;

        while (available < remaining) {
            endEntry = texts.shift();
            const [endText] = endEntry as any;
            remaining = length - available;
            available = endText.text.length;
            endOffset = remaining
        }

        const [endText, endPath] = endEntry as any;

        if (typeof token !== 'string') {
            const dec = {
                type: token.type,
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
            };

            decorations.push(dec)
        }

        start = end
    }

    const cost = new Date().getMilliseconds() - startTime.getMilliseconds();
    console.log("decorate.......", cost);
    return [...others, ...decorations]
}