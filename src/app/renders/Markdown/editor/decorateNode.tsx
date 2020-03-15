import Prism from 'prismjs';
import {DecorationJSON, Document, Editor, Node, Text} from "slate";
import {List} from "immutable";

Prism.languages.markdown = Prism.languages.extend("markup", {});
Prism.languages.insertBefore("markdown", "prolog", {
    blockquote: {pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation"},
    code: [{
        pattern: /^(?: {4}|\t).+/m,
        alias: "keyword"
    },
        {
            pattern: /``.+?``|`[^`\n]+`/,
            alias: "keyword"
        }
    ],
    title: [{
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: "important",
        inside: {punctuation: /==+$|--+$/}
    }, {pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: "important", inside: {punctuation: /^#+|#+$/}}],
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
Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);

function decorateDocument(document: Document, editor: Editor, next): Array<DecorationJSON> {
    const texts: Array<[Text, List<number>]> = [];
    document.nodes
        .forEach(function (n, index) {
            if (n == null) {
                return;
            }

            if (n.object === 'text') {
                texts.push([n, List([index as number])]);
            } else {
                Array.from(n.texts({})).forEach(t => texts.push(t));
            }
        });

    const fullText = document.nodes
        .map(n => {
            return n?.text;
        })
        .filter(t => t != null)
        .join('\n');

    let prefixOffset: undefined | number = undefined;
    let lang: undefined | string = undefined;
    let offset = 0;
    const codeBlocks: Array<[number, number, string?]> = [];
    fullText.split("\n").forEach((line) => {
        let lineLength = line.length;
        try {
            if (!line.startsWith('```')) {
                return
            }

            if (prefixOffset == null) {
                prefixOffset = offset + lineLength;
                lang = line.substr(3);
            } else {
                codeBlocks.push([prefixOffset, offset + lineLength, lang]);
                prefixOffset = undefined;
                lang = undefined;
            }
        } finally {
            offset += lineLength;
        }
    });

    const decorations = codeBlocks.map(block => {
        const [start, end, lang] = block;

        let textStart = 0;

        let anchor: any = null;
        let focus: any = null;
        texts.forEach(value => {
            const [text, path] = value;
            try {
                const textEnd = textStart + text.text.length;
                if (textStart <= start && start <= textEnd) {
                    anchor = {
                        key: text.key,
                        path: path,
                        offset: start - textStart,
                    }
                }
                if (textStart <= end && end <= textEnd) {
                    focus = {
                        key: text.key,
                        path: path,
                        offset: end - textStart,
                    }
                }
            } finally {
                textStart = textStart + text.text.length + 1;
            }
        });

        return {
            type: 'code-block',
            anchor: anchor,
            focus: focus,
            data: {
                lang: lang,
            }
        }
    });

    return decorations;
}

export function decorateNode(node: Node, editor: Editor, next) {
    if (node.object === 'document') {
        return decorateDocument(node as Document, editor, next);
    }
    const others = next() || [];
    if (node.object !== 'block') return others;

    const string = node.text;
    const texts = Array.from(node.texts({}));
    const grammar = Prism.languages.markdown;
    const tokens = Prism.tokenize(string, grammar);
    const decorations = [];
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

        const [startText, startPath] = startEntry;
        const length = getLength(token);
        const end = start + length;

        let available = startText.text.length - startOffset;
        let remaining = length;

        endOffset = startOffset + remaining;

        while (available < remaining) {
            endEntry = texts.shift();
            const [endText] = endEntry;
            remaining = length - available;
            available = endText.text.length;
            endOffset = remaining
        }

        const [endText, endPath] = endEntry;

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

    return [...others, ...decorations]
}
