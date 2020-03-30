import {DefaultTreeElement, DefaultTreeNode, parse} from 'parse5';
import {BlockJSON, NodeJSON, TextJSON} from "slate";


class AnchorParser implements Parser {
    parse(n: DefaultTreeNode, parser: ArrayParser): NodeJSON | null {
        const node = n as DefaultTreeElement;
        if (node.nodeName == 'a') {
            return {
                object: "inline",
                type: 'inline-link',
                data: {
                    url: node.attrs.find(a => a.name === 'href')?.value,
                },
                nodes: parser(node.childNodes) as any,
            }
        }
        return null;
    }
}

class TextParser implements Parser {
    parse(n: DefaultTreeNode, parser: ArrayParser): TextJSON | null {
        const node = n as DefaultTreeElement;

        if (node.nodeName === '#text') {
            return {
                object: 'text',
                text: (node as any).value,
            }
        }
        return null;
    }
}

class DefaultParser implements Parser {
    parse(n: DefaultTreeNode, parser: ArrayParser): BlockJSON | null {
        const node = n as DefaultTreeElement;

        if (node.childNodes == null) {
            return {
                object: "block",
                type: 'paragraph',
                nodes: [{
                    object: 'text',
                    text: '',
                }],
            }
        }

        return {
            object: "block",
            type: 'paragraph',
            nodes: parser(node.childNodes) as any,
        }
    }
}

const parsers: Array<Parser> = [
    new AnchorParser(),
    new TextParser(),
    new DefaultParser(),
];

const globalParser = (node: DefaultTreeNode): NodeJSON | null => {
    for (let parser of parsers) {
        let result = parser.parse(<DefaultTreeElement>node, array => {
            return array.map(a => globalParser(a)).filter(a => a != null) as any;
        });
        if (result != null) {
            return result;
        }
    }
    return null;
};

interface Parser {
    parse(node: DefaultTreeNode, parser: ArrayParser): NodeJSON | null,
}

interface ArrayParser {
    (node: Array<DefaultTreeNode>): Array<NodeJSON>,
}

export function html2Slate(str: string): Array<NodeJSON> {
    const doc = parse(str) as DefaultTreeElement;
    const html = doc.childNodes[0] as DefaultTreeElement;
    const body = html.childNodes[1] as DefaultTreeElement;

    return body.childNodes
        .map(node => globalParser(node) as any);
}

let jsons = html2Slate('<div>\n' +
    '\t<ul>\n' +
    '\t\t<li>hello</li>\n' +
    '\t\t<li>kitty</li>\n' +
    '\t</ul>\n' +
    '</div>\n' +
    '\n' +
    '<div>\n' +
    '\t<ul>\n' +
    '\t\t<li>hello</li>\n' +
    '\t\t<li>kitty</li>\n' +
    '\t</ul>\n' +
    '</div>');

console.log(JSON.stringify(jsons));
