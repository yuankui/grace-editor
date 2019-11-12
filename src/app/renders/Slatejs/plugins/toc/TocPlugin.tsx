// toc(table of content)

import {Block, Value} from "slate";
import {HeaderTypePrefix} from "../header/HeaderPlugin";

export  function createTocPlugin() {

}

interface Collector {
    (node: Block): void,
}

function travelNode(node: Block, collector: Collector) {
    if (node.type.startsWith(HeaderTypePrefix)) {
        collector(node);
    }

    if (node.nodes.isEmpty()) {
        return;
    }

    node.nodes.forEach(n => {
        if (n == undefined) {
            return;
        }

        if (n.object != 'block') {
            return;
        }

        travelNode(n, collector);
    })
}

export function parseToc(value: Value): Array<Block> {
    const list: Array<Block> = [];
    const collector: Collector = node => {
        list.push(node);
    };

    value.document.nodes.forEach(n => {
        if (n == undefined) {
            return;
        }

        if (n.object != 'block') {
            return;
        }

        travelNode(n, collector);
    });

    return list;
}